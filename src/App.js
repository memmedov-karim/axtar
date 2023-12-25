import './App.css';
import React,{useState,useEffect} from 'react';
import { Search } from './Components/SearchingForm/Search';
import { Resultblock } from './Components/Resultblock/Resultblock';
import Data from "./rfo1.json";
import SchoolCodes from './codes.json'
function App() {
 
  
  const sortData = (data) => {
    if (data) {
      data.sort((a, b) => {
        let nameA = a.Ad.toLowerCase();
        let nameB = b.Ad.toLowerCase();

        // compare the lowercase names using localeCompare
        return nameA.localeCompare(nameB);
      });
    }
    return data;
  };
  const ClearString = (val) => {
    let neww = "";
    for (let i of String(val)) {
      if (i !== " " && i !== "") {
        neww += i;
      }
    }
    return neww.toLocaleLowerCase();
  };
  const checkutis= (utis,remaind) => {
    if(remaind===""){
      return true
    }
    for(let i=0;i<utis.length;i++){
      if(remaind[i]!=="*" && remaind[i]!==utis[i]){
        return false
      }
    }
    return true
  }
  const [SearchingData, setSearchingData] = React.useState(null);
  const [searchingData,setData] = useState({ad:"",soyad:"",ata:"",utis:"",məktəb:"",bölmə:"",sinif:""})
  const getData = (e) => {
    console.log("ok")
    const {name,value} = e.target;
    setData(prev=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }
  const find = (e) => {
    e.preventDefault();
    const keys = Object.keys(searchingData);
    let res = ""
    for(let i of keys){
      res+=searchingData[i]

    }
    if(res!==""){
      const data = Data.filter(
        (obj) => ClearString(obj["Ad"]).toLowerCase().includes(searchingData["ad"].toLowerCase()) && ClearString(obj["Soyad"]).toLowerCase().includes(searchingData["soyad"].toLowerCase()) && ClearString(obj["Ata adı"]).toLowerCase().includes(ClearString(searchingData["ata"]).toLowerCase()) && (String(ClearString(obj["Utis"]).toLowerCase()).includes(searchingData["utis"].toLowerCase()) || checkutis(String(obj["Utis"]),searchingData["utis"])) &&
        String(ClearString(obj["mkod"]).toLowerCase()).includes(String(searchingData["məktəb"].toLowerCase())) && ClearString(obj["Bölmə"]).toLowerCase().includes(searchingData["bölmə"].toLowerCase()) && String(ClearString(obj["sinif"]).toLowerCase()).includes(searchingData["sinif"].toLowerCase())
      );
    setSearchingData(data);
    }
    setData({ad:"",soyad:"",ata:"",utis:"",məktəb:"",bölmə:"",sinif:""})
  }
  const FindScholName = (code) => {
    for(let i of SchoolCodes){
      if(i["Yeni Kod 5 rəqəmli ( rayon + məktəb)"]===String(code)){
        return i["Məktəbin adı"]
      }
    }
    return "Məktəb tapılmadı"
  }
  const Students = sortData(SearchingData)?.map((user, ind) => {
    let name = FindScholName(user["mkod"]);
    let otherInfo = `Mərkəz:${user["Qısa ad mərkəz"]},Otaq:${user["Otaq"]},Yer:${user["Yer"]}`;
    let rti = `RTI-${user["RTİ"]}`
    let res = name+ "||" + otherInfo+"||"+rti;
    return (
      <Resultblock res={res} key={ind} num={ind+1} ad={user["Ad"]} soyad={user["Soyad"]} ata={user["Ata adı"]} mktb={user["mkod"]} utis={user["Utis"]} sinif={user["sinif"]} blm={user["Bölmə"]} fn={user["Fənn"]} />
    );
  });
  return (
    <div className="App">
      <h1>Saaaaaalammmmmmmmmmmmmmmm</h1>
      <Search find={find} getData={getData} searchingData={searchingData} />
      {Students}
      {SearchingData !== null && SearchingData.length === 0 ? (
        <h1 style={{ textAlign:"center",color: "red" }}>Belə Yetimçə yoxdu burda</h1>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
