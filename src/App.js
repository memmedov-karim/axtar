import './App.css';
import React,{useState} from 'react';
import { Search } from './Components/SearchingForm/Search';
import { Resultblock } from './Components/Resultblock/Resultblock';
import Data from "./rfo1.json";
import SchoolCodes from './codes.json'
function App() {
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
        (obj) => ClearString(obj["Ad"]).toLocaleLowerCase().includes(searchingData["ad"].toLocaleLowerCase()) && ClearString(obj["Soyad"]).toLocaleLowerCase().includes(searchingData["soyad"].toLocaleLowerCase()) && ClearString(obj["Ata adı"]).toLocaleLowerCase().includes(ClearString(searchingData["ata"]).toLocaleLowerCase()) && (String(ClearString(obj["Utis"]).toLocaleLowerCase()).includes(searchingData["utis"].toLocaleLowerCase()) || checkutis(String(obj["Utis"]),searchingData["utis"])) &&
        String(ClearString(obj["Məktəb kodu"]).toLocaleLowerCase()).includes(String(searchingData["məktəb"].toLocaleLowerCase())) && ClearString(obj["Bölmə"]).toLocaleLowerCase().includes(searchingData["bölmə"].toLocaleLowerCase()) && String(ClearString(obj["sinif"]).toLocaleLowerCase()).includes(searchingData["sinif"].toLocaleLowerCase())
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
  const Students = SearchingData?.map((user, ind) => {
    let name = FindScholName(user["Məktəb kodu"]);
    let otherInfo = `Mərkəz:${user["Mərkəz"]},Otaq:${user["otaq"]},Yer:${user["yer"]}`;
    let res = name+ "||" + otherInfo;
    return (
      <Resultblock res={res} key={ind} num={ind+1} ad={user["Ad"]} soyad={user["Soyad"]} ata={user["Ata adı"]} mktb={user["Məktəb kodu"]} utis={user["Utis"]} sinif={user["sinif"]} blm={user["Bölmə"]} fn={user["istiqamet"]} />
    );
  });
  return (
    <div className="App">
      <h1>Salam</h1>
      <Search find={find} getData={getData} searchingData={searchingData} />
      {Students}
      {SearchingData !== null && SearchingData.length === 0 ? (
        <h1 style={{ textAlign:"center",color: "red" }}>Məlumat tapılmadı</h1>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
