import React from 'react';
import './PriceInfo.scss';

function PriceInfo() {
  return (
    <div className="priceinfo-box">
      <div className="price-text">PRICE</div>
      {/* <dl>
        <dt>VIP</dt>
        <dd>160,000원</dd>
      </dl> */}
      <div className="price-list-box">
        <div className="price-flex-box">
          <div>VIP석</div>
          <div className="price-value">150,000원</div>
        </div>
        <div className="price-flex-box">
          <div>R석</div>
          <div className="price-value">100,000원</div>
        </div>
        <div className="price-flex-box">
          <div>S석</div>
          <div className="price-value">80,000원</div>
        </div>
        <div className="price-flex-box">
          <div>A석</div>
          <div className="price-value">65,000원</div>
        </div>
      </div>
    </div>
  );
}

export default PriceInfo;
