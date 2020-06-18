import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logos: {
      "AC Allianssi": [
        {from: 2002, to: 2006, url: "https://upload.wikimedia.org/wikipedia/fi/2/25/AC_Allianssi.png"}
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
      "FC Jazz": [
        {from: 1992, to: 2013, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/9/98/FC_Jazzin_logo.svg/1920px-FC_Jazzin_logo.svg.png"},
        {from: 2014, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/d/df/FC_Jazzin_logo.jpg"}
      ],
      "FC KooTeePee": [
        {from: 1998, to: 2013, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/2/2c/FC_KooTeePeen_tunnus.svg/800px-FC_KooTeePeen_tunnus.svg.png"},
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
      "HJK": [
        {from: 1990, to: 1993, url: "https://upload.wikimedia.org/wikipedia/fi/d/db/Helsingin_Jalkapalloklubi_logo.png"},
        {from: 1994, to: 1996, url: "https://seeklogo.com/images/H/HJK_Helsinki-logo-5E20C863DA-seeklogo.com.gif"},
        {from: 1997, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/d/db/Helsingin_Jalkapalloklubi_logo.png"}
      ],
      "IFK Mariehamn": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/IFK_Mariehamnin_logo.svg/800px-IFK_Mariehamnin_logo.svg.png"}
      ],
      "Kotkan TP": [
        {from: 1998, to: 2013, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/2/2c/FC_KooTeePeen_tunnus.svg/800px-FC_KooTeePeen_tunnus.svg.png"},
      ],
      "KuPS": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/en/5/50/Kuopion_Palloseura.png"}
      ],
      "MYPA": [
        {from: 1990, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/thumb/9/97/Myllykosken_Pallo_-47-n_logo.svg/800px-Myllykosken_Pallo_-47-n_logo.svg.png"}
      ],
      "RoPS": [
        {from: 1990, to: 1996, url: "https://www.rops.fi/images/RoPS_old_logo.gif"},
        {from: 1997, to: 2004, url: "https://upload.wikimedia.org/wikipedia/fi/a/a0/RoPS_vanha_logo.png"},
        {from: 2005, to: 9999, url: "https://upload.wikimedia.org/wikipedia/fi/f/fb/Rops.png"}
      ] 
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    logo: state => (teamName, year) => {
      console.log(teamName, year)
      var logos = state.logos[teamName.trim()]
      if (logos) {
        console.log(logos)
        return logos.find(x => (x.from <= parseInt(year)) && (x.to >= parseInt(year))).url
      }
    },
  }
})
