import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  ScrollView , Animated
} from "react-native";
import { Icon, Card ,Button} from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import Footer from './footer';
import Projects from "./projects";
import Logo_catalog from './logo_catalog' ; 
import { green } from "ansi-colors";

          

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const responsiveWeb = [
      {
        t1: "Naresco Contracting L.L.C",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "www.naresco.ae",
        pic: require("../assets/p35.jpg")
      },

      {
        t1: "Al DARMAKY",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.aldarmakyuae.com/",
        pic: require("../assets/p36.jpg")
      },
      {
        t1: "Legend Group",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.legendpg.com/",
        pic: require("../assets/p37.jpg")
      },
      {
        t1: "Beauty Arabia",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.bbeautyarabia.com/category/makeup-2/",
        pic: require("../assets/p35.jpg")
      },
      {
        t1: "BOSPHOURS REAL ESTATE",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.bosphorusestate.com/",
        pic: require("../assets/p8.jpg")
      },
      {
        t1: "Bin Houfan",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.binhoufan.com/",
        pic: require("../assets/p9.jpg")
      },
      {
        t1: "Glow Roi",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.glowroi.com",
        pic: require("../assets/p35.jpg")
      },
      {
        t1: "qurais",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.qurais.com/",
        pic: require("../assets/p15.jpg")
      },
      {
        t1: "Digital Sterling",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.digitalsterling.co/",
        pic: require("../assets/p16.jpg")
      },
      {
        t1: "PROSPEC SPECIALTIES",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.prospecspecialties.com/",
        pic: require("../assets/p17.jpg")
      },
      {
        t1: "Trace Group EST",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.trace.ae/",
        pic: require("../assets/p19.jpg")
      },
      {
        t1: "Adnan Aswad",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://2014.brawaa.com/hm/adnan-newFinal/",
        pic: require("../assets/p20.jpg")
      },
      {
        t1: "Al Qodra Finance Consultants & Claims Recovery",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.alqodra.ae/",
        pic: require("../assets/p21.jpg")
      },
      {
        t1: "Top Floor Trading",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.topfloortrading.com/",
        pic: require("../assets/p23.jpg")
      },
      {
        t1: "",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://2014.brawaa.com/hm/servootech1/index.html",
        pic: require("../assets/p24.jpg")
      },
      {
        t1: "IPAC Specialized Packing LLC",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.ipac.ae/",
        pic: require("../assets/p25.jpg")
      },
      {
        t1: "Al Amal Stationery Est",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.alamalstationery.com/",
        pic: require("../assets/p26.jpg")
      },
      {
        t1: "Mamoon Dongula Management Consultancy",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.almamoonconsulting.ae/",
        pic: require("../assets/p27.jpg")
      },
      {
        t1: "Society Technology House",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://sth-uae.com/",
        pic: require("../assets/p28.jpg")
      },
      {
        t1: "Oxford Technical Services Center",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.oxfordfire.ae/",
        pic: require("../assets/p29.jpg")
      },
      {
        t1: "Profit Consulting & Advisory",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.profitconsulting.ae/",
        pic: require("../assets/p30.jpg")
      },
      {
        t1: "Enjoy Bijoux",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.enjoyourbrands.com/",
        pic: require("../assets/p31.jpg")
      },
      {
        t1: "Desert Link",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.desertlink.ae",
        pic: require("../assets/p32.jpg")
      },
      {
        t1: "LIMAH DESIGN CONSULTANTS",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.limahdesign.com/",
        pic: require("../assets/p33.jpg")
      },
      {
        t1: "IMEC",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.imecuae.com/",
        pic: require("../assets/p14.jpg")
      },
      {
        t1: "",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://2014.brawaa.com/hm/dentalExpert/",
        pic: require("../assets/p12.jpg")
      },
      {
        t1: "Delma Al Redwan Trading Co.",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.delmaalredwan.com/",
        pic: require("../assets/p2.jpg")
      },
      {
        t1: "Admission Communications",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "lhttp://www.admission.ae",
        pic: require("../assets/p3.jpg")
      },
      {
        t1: "Donerji",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://2014.brawaa.com/ma/donerji-html/index.html",
        pic: require("../assets/p34.jpg")
      },
      {
        t1: "Global Emirates Cables & Systems Industries",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.gec-me.com/",
        pic: require("../assets/p6.jpg")
      },
      {
        t1: "Petro Globe",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.petroglobe.net/",
        pic: require("../assets/p22.jpg")
      },
      {
        t1: "DGSOUQ",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.dgsouq.com/",
        pic: require("../assets/p11.jpg")
      },
      {
        t1: "PIONEER MEDICAL SERVICES L.L.C",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "www.pioneer-medical.ae",
        pic: require("../assets/p7.jpg")
      },
      {
        t1: "Unique Steel Works LLC",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.uniquesteeluae.com/",
        pic: require("../assets/p1.jpg")
      },
      {
        t1: "Afridi & Angell Legal Consultants",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.afridi-angell.com/",
        pic: require("../assets/tornado2.jpg")
      },
      {
        t1: "EFECO, L.L.C.",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.efecouae.com/",
        pic: require("../assets/tornado3.jpg")
      },
      {
        t1: "ELMACS Electro-MeChanical & Air Conditioning Systems",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.elmacsco.ae/",
        pic: require("../assets/tornado4.jpg")
      },
      {
        t1: "Enjoyourbrands",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.enjoyourbrands.com/",
        pic: require("../assets/tornado5.jpg")
      },
      {
        t1: "kele",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://kele.ae/",
        pic: require("../assets/tornado6.jpg")
      },
      {
        t1: "KON INVESTMENT",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.kon-investment.com/",
        pic: require("../assets/tornado7.jpg")
      },
      {
        t1: "LUXURY MARKETS",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.luxurymarkets.com/",
        pic: require("../assets/tornado10.jpg")
      },
      {
        t1: "Overseas Debt Recovery",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://www.overseasdr.ae/index.php",
        pic: require("../assets/tornado11.jpg")
      },
      {
        t1: "Overseas Debt Recovery",
        t2: "HTML, Jquery, CSS, PHP, Responsive",
        link: "http://qatarmarkat.com/",
        pic: require("../assets/tornado12.jpg")
      }
    ];
    const dynamicWeb = [
      {
        t1: "Flowerbox",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "https://www.flowerbox.ae/",
        pic: require("../assets/f-box.jpg")
      },
      {
        t1: "Aswan General Contracting",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.aswanuae.com/",
        pic: require("../assets/Aswan-uae.jpg")
      },
      {
        t1: "Glamour Group",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.glamour-group.ae/",
        pic: require("../assets/Glamour-group.jpg")
      },
      {
        t1: "Marina Insurance Brokers",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.marina.ae/",
        pic: require("../assets/Marina-Insurance.jpg")
      },
      {
        t1: "Spectro Line Trading LLC.",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.spectrodubai.com/",
        pic: require("../assets/Spectro-line.jpg")
      },
      {
        t1: "MUDIN AL EMARATE HOSPITALITY",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.mehospitality.com/",
        pic: require("../assets/Me-Hospitality.jpg")
      },
      {
        t1: "NARESCO CONTRACTING L.L.C",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.naresco.ae/",
        pic: require("../assets/Narsco.jpg")
      },
      {
        t1: "EFECO, L.L.C.",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.efecouae.com/",
        pic: require("../assets/Efeco.jpg")
      },
      {
        t1: "KON INVESTMENT",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.kon-investment.com/",
        pic: require("../assets/Kon-Investments.jpg")
      },
      {
        t1: "LUXURY MARKETS",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.luxurymarkets.com/",
        pic: require("../assets/Luxury-Markets.jpg")
      },
      {
        t1: "OVERSEAS DEBT RECOVERY",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.overseasdr.ae/",
        pic: require("../assets/Overseas.jpg")
      },
      {
        t1: "ELMACS Electro-MeChanical Air Conditioning Systems",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.elmacsco.ae/",
        pic: require("../assets/Elmacs-co.jpg")
      },
      {
        t1: "Adnan Aswad Engineering Consultants.",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.adnanaswad.ae/",
        pic: require("../assets/Anan-Aswad.jpg")
      },
      {
        t1: "CATALINA Interior Decor L.L.C.",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "http://www.catalinadubai.com",
        pic: require("../assets/Catalina.jpg")
      },
      {
        t1: "Regal Tours Worldwide",
        t2: "HTML, Jquery, CSS, Laravel",
        link: "https://www.regaltoursuae.com/",
        pic: require("../assets/Royal-Tours.jpg")
      },
      {
        t1: "Customer Delight Trading",
        t2: "HTML, Jquery, CSS, Php",
        link: "https://www.cdtme.com/",
        pic: require("../assets/CDT.jpg")
      },
      {
        t1: "Lyion Cosmo Trade",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.lyioncosmotrade.com/",
        pic: require("../assets/dynamic/p1.jpg")
      },
      {
        t1: "Afridi & Angell Legal Consultants",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.afridi-angell.com/",
        pic: require("../assets/dynamic/p2.jpg")
      },
      {
        t1: "Oncology Conference",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://uaeoncologycongress.com/",
        pic: require("../assets/dynamic/p3.jpg")
      },
      {
        t1: "PAN EMIRATES CATERING SERVICES (L.L.C.)",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.panecs.ae/",
        pic: require("../assets/dynamic/p4.jpg")
      },
      {
        t1: "Wings Tours Gulf L.L.C",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.wingstoursgulf.ae/",
        pic: require("../assets/dynamic/p5.jpg")
      },
      {
        t1: "AL Bedaya Consultancy & Marine Survey",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.albedayaservices.com/",
        pic: require("../assets/dynamic/p6.jpg")
      },
      {
        t1: "TEDx Youth Al Majaz Park",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.tedxyouthalmajaz.ae/",
        pic: require("../assets/dynamic/p7.jpg")
      },
      {
        t1: "SPECAST",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.specastuae.com/",
        pic: require("../assets/dynamic/p8.jpg")
      },
      {
        t1: "Blizzard LLC",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.blizzarduae.com/",
        pic: require("../assets/dynamic/p9.jpg")
      },
      {
        t1: "United Trading & Estate Services",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.unitedtradingdubai.com/",
        pic: require("../assets/dynamic/p10.jpg")
      },
      {
        t1: "Enjoy Bijoux",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.enjoyourbrands.com/",
        pic: require("../assets/dynamic/p11.jpg")
      },
      {
        t1: "Zara General Trading",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://zarageneraltrading.com/",
        pic: require("../assets/dynamic/p12.jpg")
      },
      {
        t1: "Amyal General Trading Co.(L.L.C)",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.amyaldubai.com/",
        pic: require("../assets/dynamic/p13.jpg")
      },
      {
        t1: "Kele",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.kele.ae/",
        pic: require("../assets/dynamic/p14.jpg")
      },
      {
        t1: "Vasoya Trading Co.L.L.C.",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.vasoyatrading.com/",
        pic: require("../assets/dynamic/p15.jpg")
      },
      {
        t1: "Irma Furniture",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.irma.ae/",
        pic: require("../assets/dynamic/p16.jpg")
      },
      {
        t1: "Viny Shoes",
        t2: "HTML, Jquery, CSS, PHP",
        link: "",
        pic: require("../assets/dynamic/p17.jpg")
      },
      {
        t1: "Awawdeh Auto Spare Parts",
        t2: "HTML, Jquery, CSS, PHP",
        link: "hhttp://www.awawdeh.ae/",
        pic: require("../assets/dynamic/p18.jpg")
      },
     
      {
        t1: "Blue Axis International freight forwarders",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.blueaxisshipping.com/",
        pic: require("../assets/dynamic/p19.jpg")
      },
      {
        t1: "Divers Group L.L.C",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.divers-marine.com/index.php?lng=en",
        pic: require("../assets/dynamic/p20.jpg")
      },
      {
        t1: "Horwath Mak International Trademark & Patent Attorneys",
        t2: "HTML, Jquery, CSS, PHP",
        link: "http://www.horwathmaktrademark.com/",
        pic: require("../assets/dynamic/p21.jpg")
      },
    ]
    const ecom = [
      {
        t1: "Al Wesam Pro",
        t2: "HTML, Jquery, CSS, Laravel, eCommerce",
        link: "https://www.awpro.tv/",
        pic: require("../assets/f-box.jpg")
      },
      {
        t1: "Flowerbox",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "https://www.flowerbox.ae/",
        pic: require("../assets/ecom/a-01.jpg")
      },
      {
        t1: "QatarMarkat",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "",
        pic: require("../assets/ecom/Qatar-markat.jpg")
      },
      {
        t1: "dgsouq",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "http://www.digitalsterling.co/",
        pic: require("../assets/ecom/p1.jpg")
      },
      {
        t1: "Everwin Union General Trading L.L.C",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "http://everwinhome.com/",
        pic: require("../assets/ecom/p2.jpg")
      },
      {
        t1: "TOP SKY LAND GENERAL TRADING L.L.C.",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "http://topskyland.com/",
        pic: require("../assets/ecom/p3.jpg")
      },
      {
        t1: "LITTLE PRINCESS",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "http://littleprincess.ae/",
        pic: require("../assets/ecom/p4.jpg")
      },
      {
        t1: "Chiba Motors",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "http://www.chibamotors.ae/",
        pic: require("../assets/ecom/p5.jpg")
      },
      {
        t1: "Dollar Rent a Car Abu Dhabi",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "http://dollarabudhabi.com/",
        pic: require("../assets/ecom/p6.jpg")
      },
      {
        t1: "Sit Jump Play",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "http://www.sitjumpplay.com/",
        pic: require("../assets/ecom/p7.jpg")
      },
      {
        t1: "DGSOUQ",
        t2: "HTML, Jquery, CSS, Laravel , eCommerce",
        link: "http://dgsouq.com/",
        pic: require("../assets/ecom/p8.jpg")
      },

    ]
    const logo = [
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/mercedesRus.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/trainme.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p1.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p2.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p3.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p4.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p5.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p6.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p7.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p8.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p9.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p10.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p11.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p12.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p13.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p14.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p15.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p16.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p17.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p18.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p19.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p20.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p21.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p22.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p23.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p24.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p25.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p26.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p27.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p28.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p29.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p30.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p31.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p32.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p33.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p34.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/logo/p35.jpg")
      },
    ]
    const catalog = [
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p1.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p2.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p3.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p4.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p5.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p6.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p7.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p8.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p9.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p10.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p11.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p12.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p13.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p14.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p15.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p51.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p52.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p53.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p54.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p55.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p56.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p57.jpg")
      },
      {
        t1: "",
        t2: "",
        link: "",
        pic: require("../assets/catalog/p58.jpg")
      },
    ]



    return (
      <View style={{ flex: 1 }}>
        <ScrollView scrollEventThrottle={16}>
          <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
            <Text
              style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20 }}
            >
              Responsive Websites
            </Text>

            <View style={{ height: 180, marginTop: 20 }}>
              <Animated.ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {responsiveWeb.map((data, index) => {
                  return (
                    <Projects
                      key={index}
                      imageUri={data.pic}
                      data={data}
                      
                    />
                  );
                })}
              </Animated.ScrollView>
            </View>
            
            <View style={{backgroundColor:'#B9B9B9',height:2,padding:10,margin:20}}/>      



            <Text
              style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20,marginTop:10 }}
            >
              Dynamic Websites
            </Text>
            
            <View style={{ height: 180, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {dynamicWeb.map((data, index) => {
                  return (
                    <Projects
                      key={index}
                      data={data}
                     
                    />
                  );
                })}
              </ScrollView>
            </View>
            
            <View style={{backgroundColor:'#B9B9B9',height:2,padding:10,margin:20}}/>      

            <Text
              style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20,marginTop:10 }}
            >
              E-commerce Websites
            </Text>

            <View style={{ height: 180, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {ecom.map((data, index) => {
                  return (
                    <Projects
                      key={index}
                      data={data}
                    
                    />
                  );
                })}
              </ScrollView>
            </View>

            <View style={{backgroundColor:'#B9B9B9',height:2,padding:10,margin:20}}/>      

            <Text
              style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20,marginTop:10 }}
            >
              Logo Design
            </Text>

            <View style={{ height: 130, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logo.map((data, index) => {
                  return (
                    <Logo_catalog
                      key={index}
                      data={data}
                    
                    />
                  );
                })}
              </ScrollView>
            </View>
            
            
            <View style={{backgroundColor:'#B9B9B9',height:2,padding:10,margin:20}}/>      

            <Text
              style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20,marginTop:10 }}
            >
            Catalogue & Brochure Design
            </Text>

            <View style={{ height: 130, marginTop: 20,marginBottom:10 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {catalog.map((data, index) => {
                  return (
                    <Logo_catalog
                      key={index}
                      data={data}
                    
                    />
                  );
                })}
              </ScrollView>
            </View>

          </View>
          <View style={{backgroundColor:'#B9B9B9',height:2,padding:10,margin:20}}/>      
            
          <Text
              style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20,marginTop:10 }}
          >
            Cost effective, Catalogue & Brochure Design Dubai from Tornado
          </Text>
          <Text
              style={{ fontSize: 20,  paddingHorizontal: 20,marginTop:10 }}
          >
           Now you can show your business a new way to grow exponentially with Tornado eCommerce implementation service.
          </Text>

         
            
            
            
            
            <View style={{flex: 1, flexDirection: 'row' , justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center'}}>

              <View style={{margin:10,marginBottom:10,borderRadius:80,backgroundColor:'#F55C4E',height:160,width:160,justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center'}}>
                <View>
                  <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
                    10+ Years
                  </Text>

                  <Text style={styles.otherText}>
                  100% UAE based{'\n'}company since 2004
                  </Text>
                
                </View>  

              </View>
              
              <View style={{margin:10,marginBottom:10,borderRadius:80,backgroundColor:'#1BBC9B',height:160,width:160,justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center'}}>
                 
                <View>
                 <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
                  1 Year
                  </Text>

                <Text style={styles.otherText}>
                Free Technical{'\n'}Support
                </Text>
                </View>

              </View>

            </View>    
           
           
            <View style={{flex: 1, flexDirection: 'row' , justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center'}}>

            
              
              <View style={{margin:10,marginBottom:10,borderRadius:80,backgroundColor:'#FD8835',height:160,width:160,justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                  
                <View>
                  <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
                  Domain Successfully 
                  </Text>
                  <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
                  Running
                  </Text>

                  <Text style={styles.otherText}>
                  In Custom Design{'\n'}& Development
                  </Text>
                  </View>    
             

              </View>
              <View style={{margin:10,marginBottom:10,borderRadius:80,backgroundColor:'#2AADFF',height:160,width:160,justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                  
                <View>
                  <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
                  EXPERTS
                  </Text>

                  <Text style={styles.otherText}>
                  In Custom Design{'\n'}& Development
                  </Text>
                  </View>    
             

              </View>

            </View>    

            <View style={{backgroundColor:'#B9B9B9',height:2,padding:10,margin:20}}/>      
            <Text
              style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20,marginTop:10 }}
          >
            Location & Contact Details
          </Text>

          <Text
              style={{ fontSize: 20,  paddingHorizontal: 20,marginTop:10 }}
          >
          Office # S-07, R22 France Cluster, International City, Dubai, United Arab Emirates.
          </Text>
          <Text
              style={{ fontSize: 25, fontWeight:'bold', paddingHorizontal: 20,marginTop:10 }}
          >
         +971 4 4509840 (4 Lines)
          </Text>

           <Button title="Request A Quote" buttonStyle={{width:wp('50%'),marginHorizontal:wp('25%'),marginTop:15}}
             onPress={()=>this.props.navigation.navigate('RequestAQuota')}
           />     
           <View style={{backgroundColor:'#B9B9B9',height:2,padding:10,margin:20}}/>      
          <Footer/> 
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1
  },
  row:{
    
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
    
  },
  aboutText: {
    fontSize: 25,
    color: "blue",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 5
  },
  headerContainer: {
    height: 150
  },
  headerText: {
    color: "#fff8f8"
  },
  screenContainer: {
    alignContent: "center",
    // alignItems:'flex-start'
    padding: 10
    // margin:30
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20
  },
  screen: {
    // backgroundColor:'skyblue'
    margin: 10,
    flexDirection: "row"
    //justifyContent:'space-evenly',
    // alignItems:'flex-start'
  }
});
