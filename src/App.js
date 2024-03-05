import './App.css';
import React,{useState,useEffect} from 'react';
import { Search } from './Components/SearchingForm/Search';
import { Resultblock } from './Components/Resultblock/Resultblock';
import Data from "./rfo1.json";
import SchoolCodes from './codes.json'
function App() {
  function calculateLevenshteinDistance(str1, str2) {
    const len1 = str1.length + 1;
    const len2 = str2.length + 1;
  
    // Create a matrix to store distances
    const matrix = Array(len1).fill(null).map(() => Array(len2).fill(null));
  
    // Initialize the matrix
    for (let i = 0; i < len1; i++) {
      matrix[i][0] = i;
    }
  
    for (let j = 0; j < len2; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the matrix
    for (let i = 1; i < len1; i++) {
      for (let j = 1; j < len2; j++) {
        const cost = str1.charAt(i - 1) === str2.charAt(j - 1) ? 0 : 1;
  
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,     // Deletion
          matrix[i][j - 1] + 1,     // Insertion
          matrix[i - 1][j - 1] + cost // Substitution
        );
      }
    }
  
    // The Levenshtein distance is the value in the bottom-right cell of the matrix
    return matrix[len1 - 1][len2 - 1];
  }
  
  // Example usage:
  const similarityThreshold = 0.5; // You can adjust this threshold based on your requirements
  
  function areStringsSimilar(str1, str2) {
    console.log(str1,str2)
    const distance = calculateLevenshteinDistance(str1, str2);
    return distance <= similarityThreshold;
  }
  
  // Test examples
  // console.log(areStringsSimilar("rəfət", "rüfət")); // true
  
  const ChangeText = (val) => {
    if (val === "W") {
      return "ə";
    } else if (val === "I") {
      return "ı";
    } else if (val === "s") {
      return "ş";
    } else if (val === "g") {
      return "ğ";
    } else if (val === "o") {
      return "ö";
    } else if (val === "c") {
      return "ç";
    } else if (val === "u") {
      return "ü";
    } else {
      return val.toLowerCase();
    }
  };
  const chngword = (text)=>{
    let neww = "";
    for(let i of text){
      neww+=ChangeText(i);
    }
    return neww;
  }

  console.log(chngword('ZWHRA'))

  
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
  const [searchingData,setData] = useState({ad:"",soyad:"",ata:"",utis:"",məktəb:"",bölmə:"",sinif:"",mrkz:""})
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
        (obj) => ( ClearString(obj["Ad"]).toLowerCase().includes(searchingData["ad"].toLowerCase()) ) && ClearString(obj["Soyad"]).toLowerCase().includes(searchingData["soyad"].toLowerCase()) && ClearString(obj["Ata adı"]).toLowerCase().includes(ClearString(searchingData["ata"]).toLowerCase()) && (String(ClearString(obj["Utis"]).toLowerCase()).includes(searchingData["utis"].toLowerCase()) || checkutis(String(obj["Utis"]),searchingData["utis"])) &&
        String(ClearString(obj["mkod"]).toLowerCase()).includes(String(searchingData["məktəb"].toLowerCase())) && ClearString(obj["Bölmə"]).toLowerCase().includes(searchingData["bölmə"].toLowerCase()) && ClearString(obj["Qısa ad mərkəz"]).toLowerCase().includes(searchingData["mrkz"].toLowerCase()) && String(ClearString(obj["sinif"]).toLowerCase()).includes(searchingData["sinif"].toLowerCase())
      );
    setSearchingData(data);
    }
    setData({ad:"",soyad:"",ata:"",utis:"",məktəb:"",bölmə:"",sinif:""})
  }
  const FindScholName = (code) => {
    for(let i of SchoolCodes){
      if(String(i["Yeni Kod 5 rəqəmli ( rayon + məktəb)"])===String(code)){
        return i["Məktəbin adı"]
      }
    }
    return "Məktəb tapılmadı";
  }
  const Students = sortData(SearchingData)?.map((user, ind) => {
    let name = FindScholName(user["mkod"]);
    let otherInfo = `Mərkəz:${user["Qısa ad mərkəz"]},Otaq:${user["Otaq"]},Yer:${user["Yer"]}`;
    let rti = `Şəhər-${user["Şəhər"]}`
    let res = name+ "||" + otherInfo+"||"+rti;
    return (
      <Resultblock res={res} key={ind} num={ind+1} ad={user["Ad"]} soyad={user["Soyad"]} ata={user["Ata adı"]} mktb={user["mkod"]} utis={user["Utis"]} sinif={user["sinif"]} blm={user["Bölmə"]} fn={user["Fənn"]} mrkz={user["Qısa ad mərkəz"]}/>
    );
  });
  return (
    <div className="App">
      <h1>Salamammmmmmmmmmmmmmmmmmmmmm</h1>
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
