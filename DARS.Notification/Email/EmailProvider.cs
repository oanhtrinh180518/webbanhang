using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Net;
using System.Reflection;
using Newtonsoft.Json;
using BanHang.Notification.Email.Models;
using Microsoft.Extensions.Logging;
using NLog;

namespace BanHang.Notification.Email
{
    public class EmailProvider : IEmailProvider
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EmailProvider> _logger;

        public EmailProvider(IConfiguration configuration, ILogger<EmailProvider> logger)
        {
            _config = configuration;
            _logger = logger;
        }

        public async Task<bool> ExecuteAsync(EmailProviderParameter parameter)
        {
            try
            {
                var apiKey = _config["SendGrid:ApiKey"];
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress(parameter.mail_from, parameter.mail_from_title);
                var subject = parameter.mail_subject;


                var plainTextContent = parameter.plain_text_content;
                var htmlContent = parameter.html_content;
                SendGridMessage msg;
                if (parameter.mail_tos != null && parameter.mail_tos.Any())
                {
                    var tos = parameter.mail_tos.Select(t => new EmailAddress(t.Key, t.Value)).ToList();
                    msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, subject, plainTextContent, htmlContent);
                }
                else
                {
                    var to = new EmailAddress(parameter.mail_to, parameter.mail_to_title);
                    msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                }
                // set email tempate if any
                if (!string.IsNullOrEmpty(parameter.template_id))
                {
                    msg.TemplateId = parameter.template_id;
                }

                // merge fields
                if (parameter.merge_fields != null && parameter.merge_fields.Any())
                {
                    msg.AddSubstitutions(parameter.merge_fields);
                }

                var response = await client.SendEmailAsync(msg);
                if (response.StatusCode == HttpStatusCode.Accepted)
                    return true;
                else
                {
                    _logger.LogError($"{response.StatusCode}: {response.Headers}", "ExecuteAsync error");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ExecuteAsync error");
                return false;
            }
        }

        public async Task<EmailTemplates> GetTemplatesAsync()
        {
            try
            {
                var sg = new SendGridClient(_config["SendGrid:ApiKey"]);
                var response = await sg.RequestAsync(method: SendGridClient.Method.GET, urlPath: "templates?generations=legacy,dynamic");
                var content = await response.Body.ReadAsStringAsync();
                var templates = JsonConvert.DeserializeObject<EmailTemplates>(content);
                return templates;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetTemplatesAsync");
                throw;
            }
        }

        public async Task<EmailTemplate> GetTemplateByIdAsync(string id)
        {
            try
            {
                var sg = new SendGridClient(_config["SendGrid:ApiKey"]);
                var response = await sg.RequestAsync(method: SendGridClient.Method.GET, urlPath: $"templates/{id}");
                var content = await response.Body.ReadAsStringAsync();
                var template = JsonConvert.DeserializeObject<EmailTemplate>(content);
                return template;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetTemplateByIdAsync");
                throw;
            }
        }

        public async Task<EmailTemplate> GetTemplateByNameAsync(string templateName)
        {
            try
            {
                var templates = await this.GetTemplatesAsync();
                if (templates != null && templates.templates.Any())
                {
                    return templates.templates.FirstOrDefault(t => t.name == templateName);
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetTemplateByNameAsync");
                throw;
            }
        }
    }
}
