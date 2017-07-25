import React from 'react'
import { APP_NAME } from '../../config'

const HomePage = () => (
  <div id="home">
    <section className="cover">
      <div className="container">
        <div className="intro-text">
            <div className="intro-lead-in">{APP_NAME}</div>
            <br />
            <div className="intro-heading">よう皆</div>
        </div>
      </div>
    </section>
    <section id="home-items">
      <div className="container">
        <div className="jumbotron">
          <h1 className="heading">Vilket år är det?</h1>
          <br />
          <h3 className="heading">Jag har ingen aning</h3>
        </div>
          <div className="row">
              <div className="col-sm-3 square">
                  <i className="fa fa-amazon fa-5x"></i>
                  <p>Etiam consectetur turpis et eros pulvinar, ut mattis massa ultrices. Modus invenire delicatissimi his ad.  Ea modus luptatum vel. </p>
              </div>
              <div className="col-sm-3 square">
                  <i className="fa fa-check-circle fa-5x"></i>
                  <p>Sälj inte skinnet förrän björnen är skjuten.  Bättre ensam än i dåligt sällskap.  Eget beröm luktar illa.  Det är inte ens fel när två träter. </p>
              </div>
              <div className="col-sm-3 square">
                   <i className="fa fa-soundcloud fa-5x"></i>
                   <p>Ин фацер фабеллас аппеллантур сед, хис бонорум еяуидем иудицабит еу. Цлита легендос десеруиссе вел еи.</p>
              </div>
              <div className="col-sm-3 square">
                  <i className="fa fa-cc-stripe fa-5x"></i>

                  <p>संसाध कारन बिन्दुओ बिन्दुओमे लगती किएलोग प्रेरना सुचना पढने खरिदे माध्यम प्रेरना एसेएवं गयेगया स्वतंत्रता संदेश विषय वेबजाल विकेन्द्रियकरण बनाकर कैसे नयेलिए पहोचाना</p>
              </div>
          </div>
        </div>
    </section>
 
  </div>
)

export default HomePage
