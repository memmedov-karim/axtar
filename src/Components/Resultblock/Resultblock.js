import React, { useState } from "react";
import "./Resultblock.css";
//Ə-W,
export const Resultblock = ({res,num,ad,soyad,ata,mktb,utis,sinif,blm,fn}) => {
  const ChangeText = (val) => {
    if (val.toUpperCase() === "Ə") {
      return "W";
    } else if (val === "i" && (val.toUpperCase() === "İ" || val.toUpperCase() === "I") ) {
      return "i";
    } else if (val.toUpperCase() === "Ş") {
      return "s";
    } else if (val.toUpperCase() === "Ğ") {
      return "g";
    } else if (val.toUpperCase() === "Ö") {
      return "o";
    } else if (val.toUpperCase() === "Ç") {
      return "c";
    } else if (val.toUpperCase() === "Ü") {
      return "u";
    } else {
      return val.toUpperCase();
    }
  };
  const change = (text) =>{
    let neww = "";
    for(let i of text){
      neww+=ChangeText(i)
    }
    return neww;
  }
  // let d = ""
  // for(let i of "Dilbərdınşğöçü"){
  //   d+=ChangeText(i)
  // }
  // console.log(d)
  const [colorrsnf,setcolsnf] = React.useState("")
  const [colorAd, setColorAd] = React.useState("");
  const [colorSoyad, setColorSoyad] = React.useState("");
  const [colorAta, setColorAta] = React.useState("");
  const [colormktb,setcolormktb] = useState("")
  const [colorutis,setcolorutis] = useState("");
  const [colorblm,setcolorblm] = useState("");
  const [colorfenn,setcolorfenn] = useState("");
  const resetOtherColors = (currentSetColor) => {
    const allSetColors = [setColorAd, setColorSoyad, setColorAta,setcolsnf,setcolormktb,setcolorutis,setcolorblm,setcolorfenn];
    // Add other setColor functions to the array

    allSetColors.forEach((setColor) => {
      if (setColor !== currentSetColor) {
        setColor("");
      }
    });
  };
  function handleClick(text,setcol){
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard!');
        setcol("green")
        resetOtherColors(setcol);
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  };
  
  return (
    <div title={res} className="all">
      <div className="index">{num}</div>
      <div className="user-info">
        <div className="user-info-item">
          <span className="user-info-label">Ad:</span>
          <span style={{color:colorAd}} onClick={()=>handleClick(change(ad),setColorAd)} className="user-info-value">{ad}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Soyad:</span>
          <span style={{color:colorSoyad}} onClick={()=>handleClick(change(soyad),setColorSoyad)} className="user-info-value">{soyad}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Ata:</span>
          <span style={{color:colorAta}} onClick={()=>handleClick(change(ata.split(' ')[0]),setColorAta)} className="user-info-value">{ata}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Məktəb:</span>
          <span style={{color:colormktb}} onClick={()=>handleClick(mktb,setcolormktb)} className="user-info-value">{mktb}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Utis:</span>
          <span style={{color:colorutis}} onClick={()=>handleClick(utis,setcolorutis)} className="user-info-value">{utis}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Sinif:</span>
          <span style={{color:colorrsnf}} onClick={()=>handleClick(sinif<10 ? "0"+sinif:sinif,setcolsnf)} className="user-info-value">{sinif}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Bölmə:</span>
          <span style={{color:colorblm}} onClick={()=>handleClick(blm[0],setcolorblm)} className="user-info-value">{blm}</span>
        </div>
        <div className="user-info-item">
          <span className="user-info-label">Fənn:</span>
          <span style={{color:colorfenn}} onClick={()=>handleClick(fn[0],setcolorfenn)} className="user-info-value">{fn}</span>
        </div>
      </div>
    </div>
  );
};

