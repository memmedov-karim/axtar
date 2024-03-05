import React from "react";
import "./Search.css";
export const Search = ({find,getData,searchingData}) => {
  return (
    <form onSubmit={find}>
      <div className="form-row">
        <input onChange={getData} type="text" placeholder="Ad" name="ad" value={searchingData.ad} />
        <input onChange={getData} type="text" placeholder="Soyad" name="soyad" value={searchingData.soyad} />
        <input onChange={getData} type="text" placeholder="Ata" name="ata" value={searchingData.ata} />
        <input onChange={getData} type="text" placeholder="Utis" name="utis" value={searchingData.utis} />
        <input onChange={getData} type="text" placeholder="Mərkəz" name="mrkz" value={searchingData.mrkz} />
      </div>
      <div className="form-row">
        <input onChange={getData} type="text" placeholder="Məktəb" name="məktəb" value={searchingData.məktəb} />
        <input onChange={getData} type="text" placeholder="Bölmə" name="bölmə" value={searchingData.bölmə} />
        <input onChange={getData} type="text" placeholder="Sinif" name="sinif" value={searchingData.sinif} />
        <input onChange={getData} className="buttons" type="submit" value="Axtar" />
      </div>
    </form>
  );
};
