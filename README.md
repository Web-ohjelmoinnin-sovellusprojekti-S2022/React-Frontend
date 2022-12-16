GonaCompany Kaaviot – Kaaviodatapalvelu
=======================================

Tekijät: [Mike Huovinen](https://github.com/Miekhuovinen), [Julius Häikiö](https://github.com/t1haju05), [Ville-Valtteri Yritys](https://github.com/Frostedlol), [Hermanni Huotari](https://github.com/HHuotari)

Esittely
--------
GonaCompany Charts on Oulun ammattikorkeakoulun 2. vuoden opiskelijoiden kehittämä visualisointityökalu, joka esittää ilmastonmuutokseen liittyvää tietoa kaavioissa. Sovellusprojekti on toteutettu käyttäen React-teknologiaa selaimessa ja Java-teknologiaa palvelimessa. Projektissa toteutettiin web-pohjainen REST API -sovellus, jossa käyttäjä voi selata ilmastonmuutokseen liittyviä kaavioita ja luoda omia näkymiä yhdistäen valitsemiaan kaavioita. Tietokantana toimii MySQL-palvelin, johon data siirrettiin suurimmalta osin suoraan Excelistä SQL-komentoja käyttäen. Kaikki projektissa käytetty data on julkisesti saatavilla ja lähteet on mainittu kaavioissa. Testauksessa käytettiin useita testityökaluja kuten Mocha, Chai, Jest ja React Testing Library.

Jokainen projektiryhmän jäsen toimi projektissa Full Stack -kehittäjänä, työstäen sekä selain- että palvelinpuolta.

Sovelluksen toteutus
--------

Lämpötilatiedot
--------

Käyttöliittymän yläpalkista löytyy painikkeet sisään- ja uloskirjautumiseen sekä käyttäjän luomiseen. Lisäksi painikkeiden vieressä on ”Kaaviot” -pudotusvalikko, jonka kautta pääsee katsomaan lämpötila- ja päästökaavioita, ja halutessaan käyttäjä voi luoda näistä oman näkymän. 

Pudotusvalikosta valittu ensimmäinen näkymä ”Lämpötilatiedot ja CO2 pitoisuudet” (kuva 1) näyttää sivulla kaaviot V1–V7 sekä V10. Kaaviot näkyvät allekkain ja käyttöliittymä skaalautuu, mikäli selaimen ikkunan kokoa muutetaan.


![Image](Kuvat/Kuva1.png)

>**KUVA 1.** _Lämpötilatietojen CO2 pitoisuuksien näkymä_

Päästölähteet
--------

Valikon toisesta näkymästä voi tarkastella CO2-päästölähteitä toimiala- ja maakohtaisesti. (kuva 2)

Näkymästä löytyy pinottu viivagraafi ajan suhteen maakohtaisista CO2-päästöistä (V8) sekä donitsikaavio CO2-päästöistä toimialoittain (V9).

![Image](Kuvat/Kuva2.png)

>**Kuva 2.** _Päästökaaviot  -sivu avattuna_

Käyttäjän omat näkymät
--------

Sovelluksessa on mahdollista luoda omia näkymiä sekä tallentaa ja jakaa niitä muille. (kuvat 3 ja 4)

Kyseinen toiminto on näkyvissä vain kirjautuneelle käyttäjälle. Käyttäjä voi valita haluamansa kaaviot näkymälleen ja myös halutessaan asettaa kaavioille omat kuvaustekstit. Painamalla ”Luo näkymä” -nappia sovellus näyttää käyttäjän valitsemat kaaviot halutulla asettelulla joko allekkain tai rinnakkain.

![Image](Kuvat/Kuva3.png)

>**Kuva 3.** _Oman näkymän luonti  -sivu avattuna_

Oma profiili
--------

Kirjautunut käyttäjä voi selata luomiaan näkymiä oman profiilinsa kautta. Näkymiä on myös mahdollista jakaa linkillä eikä niiden katsominen vaadi kirjautumista. Itse tehdyt näkymät voi poistaa halutessaan.

Oman profiilin kautta on myös mahdollista poistaa käyttäjätili, jolloin myös kaikki kyseisen käyttäjän omat näkymät poistuvat.

![Image](Kuvat/Kuva4.png)

>**Kuva 4.** _Tallennettujen näkymien -sivu avattuna_

Sovelluksen tietokantarakenne
--------

![Image](Kuvat/Kuva5.png)

>**Kuva 5.** _Tietokantarakenne_

Käyttöönotto
--------

1. Kloonaa repositoriot ([React-Frontend](https://github.com/Web-ohjelmoinnin-sovellusprojekti-S2022/React-Frontend) ja [Java-backend](https://github.com/Web-ohjelmoinnin-sovellusprojekti-S2022/Java-Backend))
2. Siirry komentokehotteeseen Frontend -kansiossa ja aja komento “npm install”. Tämän jälkeen voit käynistää sovelluksen komennolla “npm start”.
3. Käynnistä MySQL -palvelin XAMPPia käyttäen.
4. Luo projektin tietokanta ajamalla Backendistä löytyvä [.sql](https://github.com/Web-ohjelmoinnin-sovellusprojekti-S2022/Java-Backend/blob/main/usersdb_2022-12-12_130211.sql) -tiedosto.
5. Käynnistä Java-palvelin.


[Linkki projektin esittelyvideoon](https://youtu.be/xI85W6zm3Ag?t=87)
