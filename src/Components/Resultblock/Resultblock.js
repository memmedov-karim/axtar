import React from "react";
import "./Resultblock.css";
export const Resultblock = ({res,num,ad,soyad,ata,mktb,utis,sinif,blm,fn}) => {
  return (
    <div title={res} className="all">
      <div className="index">{num}</div>
      <div className="user-info">
        <div className="user-info-item">
          <span className="user-info-label">Ad:</span>
          <span className="user-info-value">{ad}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Soyad:</span>
          <span className="user-info-value">{soyad}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Ata:</span>
          <span className="user-info-value">{ata}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Məktəb:</span>
          <span className="user-info-value">{mktb}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Utis:</span>
          <span className="user-info-value">{utis}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Sinif:</span>
          <span className="user-info-value">{sinif}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Bölmə:</span>
          <span className="user-info-value">{blm}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Fənn:</span>
          <span className="user-info-value">{fn}</span>
        </div>
      </div>
    </div>
  );
};
