import React from 'react';

export function BestSellingCard({data}) {
  console.log(data)
  return (
    <div className="bsCard">
      <div className="bsCard__header m-b-20">
        <h5>Best selling</h5>
      </div>
      <div className="bsCard__body">
        <ul className="bsCard__body-list">
          {data && data.map(item => (
            <li>
              <div className="bsCard__body-item">
                <div className="bsCard__body-item--info">
                  <img src={process.env.PUBLIC_URL + 'img/icon/flatIcon/on-delivery_64.png'} alt=""/>
                  <div>
                    <p>{item.name}</p>
                    <span>{item.categoryName}</span>
                  </div>
                </div>
                <div className="bsCard__body-item--sold">
                  <p>Sold</p>
                  <span>{item.sold}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export function TopSpendCard({data}) {
  console.log(data)
  const getMedal = (index) => {
    switch (index) {
      case 0: return 'gold-medal_64.png'
      case 1: return 'silver-medal_64.png'
      case 2: return 'bronze-medal_64.png'
      default: return ''
    }
  }
  const handlePrice = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
  }
  return (
    <div className="tsCard">
      <div className="tsCard__header m-b-20">
        <h5>Most Spend Money</h5>
      </div>
      <div className="tsCard__body">
        <ul className="tsCard__body-list">
          {data && data.map((item, index) => (
            <li key={index} className="tsCard__body-item">
              <div className="tsCard__body-left">
                <img className="--rank" src={process.env.PUBLIC_URL + `img/icon/flatIcon/${getMedal(index)}`} alt=""/>
                <div className="--info">
                  <p>{item.fullName}</p>
                  <span>{item.userName}</span>
                </div>
              </div>
              <div className="tsCard__body-right">
                <span>{handlePrice(item.totalSpend)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
