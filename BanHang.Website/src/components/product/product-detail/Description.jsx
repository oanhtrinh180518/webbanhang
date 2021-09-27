const Description = ({ supplierName, categoryName, createDate, expDate }) => {
  // const str=`Use the Canon VIXIA GX10 Camcorder to capture UHD 4K video at 60 fps,
  //     recording in MP4 to dual SD memory card slots. This camcorder packs several pro-style
  //     features into its compact form, including Dual-Pixel Autofocus (DPAF). The GX10's 1" 8.29MP
  //     CMOS sensor and dual DIGIC DV 6 image processors support Wide DR Gamma with high sensitivity
  //     and low noise. Slow and fast-motion recording up to 120 fps offers special looks for highlighting
  //     sports and other special events. Smooth, steady shooting is assisted by the GX10's five-axis optical
  //     image stabilization. For composing and viewing your footage, the VIXIA GX10 incorporates
  //     a flip-out 3.5" touchscreen LCD, and a 0.24" electronic viewfinder.

  //     Additional GX10 features include an HDMI 2.0 port for outputting your 4K UHD footage, assignable
  //     user buttons, and remote control using the included WL-D89 controller. Wi-Fi connectivity offers
  //     live streaming, FTP file sharing, and remote control via iOS and Android apps.`;
  //     const [content,setContent]=useState(str);

  // const creDate=createDate();
  // console.log("cre",creDate);
  return (
    <div className="product-description'">
      <div className="description__name-supplier">
        <span>{`Producer: ${supplierName}`}</span>
      </div>
      <div className="description__name-category">
        <span>{`Name Category: ${categoryName}`}</span>
      </div>
      <div className="description_datatime">
        {/* <span>{`Expiry date: From ${createDate.substring(
          0,
          createDate.indexOf("T")
        )} to ${expDate?.substring(0, expDate?.indexOf("T"))}`}</span> */}
      </div>
    </div>
    // <p>
    //     {content}
    // </p>
  );
};

export default Description;
