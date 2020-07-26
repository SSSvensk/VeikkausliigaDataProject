import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logos: {
      "AC Allianssi": [
        {from: 2002, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/2/25/AC_Allianssi.png"}
      ],
      "AC Oulu": [
        {from: 2003, to: 2006, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/7/7f/AC_Oulun_logo_%28vanha%29.svg/800px-AC_Oulun_logo_%28vanha%29.svg.png"},
        {from: 2007, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/d/d5/AC_Oulu_logo.svg/800px-AC_Oulu_logo.svg.png"}
      ],
      "FC Haka": [
        {from: 1990, to: 1992, url: "https://upload.wikimedia.org/wikipedia/fi/5/57/FC_Haka.png"},
        {from: 1993, to: 2005, url: "https://seeklogo.com/images/H/Haka_FC-logo-3314E79C31-seeklogo.com.gif"},
        {from: 2006, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/5/57/FC_Haka.png"}
      ],
      "FC Honka": [
        {from: 1, to: 2, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/e/e0/FC_Honkan_logo.svg/800px-FC_Honkan_logo.svg.png"},
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/6/60/FC_Honka_logo.png"}
      ],
      "FC Inter": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/8/88/FC_Inter_Turku_logo.png"}
      ],
      "FC Jazz": [
        {from: 1992, to: 2013, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/9/98/FC_Jazzin_logo.svg/1920px-FC_Jazzin_logo.svg.png"},
        {from: 2014, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/d/df/FC_Jazzin_logo.jpg"}
      ],
      "FC Jokerit": [
        {from: 1999, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/5/5a/FC_Jokerien_logo.svg/800px-FC_Jokerien_logo.svg.png"},
      ],
      "FC KooTeePee": [
        {from: 1998, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/2/2c/FC_KooTeePeen_tunnus.svg/800px-FC_KooTeePeen_tunnus.svg.png"},
       ],
      "FC KTP": [
        {from: 2014, to: 2015, url: "https://upload.wikimedia.org/wikipedia/fi/c/c0/130px-Kotkan_Ty%C3%B6v%C3%A4en_Palloilijat.png"},
        {from: 2016, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/9/9d/FC_KTP_logo.png"}
       ],
      "FC Lahti": [
        {from: 1996, to: 2012, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/e/ed/FC_Lahti.svg/800px-FC_Lahti.svg.png"},
        {from: 2013, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/6/64/FC_Lahti_logo.png"}
      ],
      "FF Jaro": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/1/13/FF_Jaro_logo.png"}
      ],
      "HIFK": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/HIFK-Jalkapallo.svg/800px-HIFK-Jalkapallo.svg.png"}
      ],
      "HJK": [
        {from: 1990, to: 1993, url: "https://upload.wikimedia.org/wikipedia/fi/d/db/Helsingin_Jalkapalloklubi_logo.png"},
        {from: 1994, to: 1996, url: "https://seeklogo.com/images/H/HJK_Helsinki-logo-5E20C863DA-seeklogo.com.gif"},
        {from: 1997, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/d/db/Helsingin_Jalkapalloklubi_logo.png"}
      ],
      "IFK Mariehamn": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/IFK_Mariehamnin_logo.svg/800px-IFK_Mariehamnin_logo.svg.png"}
      ],
      "Ilves": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/5/52/Tampereen_Ilveksen_logo.svg/800px-Tampereen_Ilveksen_logo.svg.png"}
      ],
      "JJK": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/a/a6/FC_JJK.svg/800px-FC_JJK.svg.png"}
      ],
      "Kotkan TP": [
        {from: 1998, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/2/2c/FC_KooTeePeen_tunnus.svg/800px-FC_KooTeePeen_tunnus.svg.png"},
      ],
      "Kumu": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/lt/d/db/Kumu-logo.gif?1592728025674"},
      ],
      "KuPS": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/en/5/50/Kuopion_Palloseura.png"}
      ],
      "Kuusysi": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/f/f9/Kuusysin_logo.svg/800px-Kuusysin_logo.svg.png"}
      ],
      "MYPA": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/9/97/Myllykosken_Pallo_-47-n_logo.svg/800px-Myllykosken_Pallo_-47-n_logo.svg.png"}
      ],
      "PK-35 Vantaa": [
        {from: 1990, to: 2014, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/0/0e/PK-35logo.jpg/800px-PK-35logo.jpg"},
        {from: 2015, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/7/7d/PK-35_Vantaa_logo.png"}
      ],
      "PS Kemi": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/b/b3/PS_Kemi.png"}
      ],
      "Reipas": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/d/d4/Lahden_Reipas_logo.png"}
      ],
      "RoPS": [
        {from: 1990, to: 1996, url: "https://www.rops.fi/images/RoPS_old_logo.gif"},
        {from: 1997, to: 2004, url: "https://upload.wikimedia.org/wikipedia/fi/a/a0/RoPS_vanha_logo.png"},
        {from: 2005, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/f/fb/Rops.png"}
      ],
      "SJK": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/f/fe/Sein%C3%A4joen_Jalkapallokerho_logo.svg/800px-Sein%C3%A4joen_Jalkapallokerho_logo.svg.png"}
      ],
      "TamU": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/7/70/Tampere-Unitedin-logo-2016.svg/800px-Tampere-Unitedin-logo-2016.svg.png"}
      ],
      "TP-47": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/6/67/Tornion_Pallo_-47-n_logo.svg/800px-Tornion_Pallo_-47-n_logo.svg.png"}
      ],
      "TPS": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/a/a5/TPS_logo.png"}
      ],
      "TPV": [
        {from: 1990, to: 2005, url: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0000/8630/brand.gif?itok=z5KMonx5"},
        {from: 2006, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/8/81/TPV_logo.png"}
      ],
      "VPS": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Vaasan_Palloseura_logo.svg/800px-Vaasan_Palloseura_logo.svg.png"}
      ]
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    logo: state => (teamName, year) => {
      var logos = state.logos[teamName.trim()]
      if (logos) {
        return logos.find(x => (x.from <= parseInt(year)) && (x.to >= parseInt(year))).url
      }
    },
  }
})
