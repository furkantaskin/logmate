import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

interface listComp {
    url: string,
    username: string,
    pass: string
}


const getUrl: string = process.env.GETURL!;
const postUrl: string = process.env.POSTURL!;
console.log(getUrl, postUrl);
let isActive: boolean = false;
let getList: {[key: string]: listComp} = {}
const addButton = document.querySelector("svg.addnew");
const refButton = document.querySelector("svg.refresh");
const sideMenu = document.querySelector(".sideMenu");
const postButton = document.getElementById("addurl");
const notifySpan: HTMLElement = document.querySelector("span.info") as HTMLElement;
const mainSpan: HTMLElement = document.querySelector("span.mainInfo") as HTMLElement;

let siteList = document.getElementById("siteler") as HTMLSelectElement;


function fetchData() {
    axios.get(getUrl,)
        .then(function (response) {

            getList = response.data;
            mainSpan.innerHTML = "Veriler güncellendi";
            for (const key in getList){
                let option = document.createElement("option") as HTMLOptionElement;
                option.text = option.value = (getList[key] as {url: string}).url;
                siteList.appendChild(option);
            }
            
            

            setTimeout(() => {
                mainSpan.innerHTML = ""
            }, 1000)
        })
        .catch(function (error) {
            mainSpan.innerHTML = `İşlem sırasında hata oluştu. Hata: ${error}`;
            setTimeout(() => {
                mainSpan.innerHTML = ""
            }, 1000)
            mainSpan.style.color = "#633A36";

        });
}

function toggleMenu(isOpen: boolean) {
    if (isOpen) {
        sideMenu?.classList.add("show");
        addButton?.classList.add("show");
    } else {
        sideMenu?.classList.remove("show");
        addButton?.classList.remove("show");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    fetchData()
})


function sendData(link: string, user: string, passw: string) {
    let data = JSON.stringify({
        "url": link,
        "username": user,
        "password": passw
    });

    let config = {
        method: 'post',
        url: "http://127.0.0.1:8000/register/",
        headers: {
            "Content-Type": "application/json"
        },
        data: data
    }

    axios(config)
        .then(function (response) {
            notifySpan.innerHTML = response.data.message;
            notifySpan.style.color = "#365F63";
            setTimeout(() => {
                notifySpan.innerHTML = ""
            }, 1000)
        })
        .catch(function (error) {
            notifySpan.innerHTML = `İşlem sırasında hata oluştu. Hata: ${error}`;
            notifySpan.style.color = "#633A36";
            setTimeout(() => {
                mainSpan.innerHTML = ""
            }, 1000)
        });
}


postButton?.addEventListener("click", () => {
    let url = (<HTMLInputElement>document.getElementById("url")).value;
    let username = (<HTMLInputElement>document.getElementById("username")).value;
    let pass = (<HTMLInputElement>document.getElementById("password")).value;

    sendData(url, username, pass);
})
refButton?.addEventListener("click", () => {
    fetchData()
})


addButton?.addEventListener("click", () => {
    toggleMenu(!isActive);
    isActive = !isActive;
})



