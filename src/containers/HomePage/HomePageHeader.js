import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import "./HomePageHeader.scss";
import logoApp from '../../assets/yourImages/bookingCareLogo.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
class HomePageHeader extends Component {
  changeLanguage = (lang) => {
    this.props.changeLanguageView(lang)
  }
  render() {
    let language = this.props.language;

    return (
      <React.Fragment>
        <div className='home-header-container'>
          <div className='home-header-content'>
            <div className='left-content'>
              <i className="fas fa-bars"></i>
              <img className='header-logo' src={logoApp} />
            </div>
            <div className='center-content'>
              <div className='child-center-content'>
                <div><b><FormattedMessage id="homeHeader.HH00" /></b></div>
                <div className='subs-title'><FormattedMessage id="homeHeader.HH01" /></div>
              </div>
              <div className='child-center-content'>
                <div><b><FormattedMessage id="homeHeader.HH02" /></b></div>
                <div className='subs-title'><FormattedMessage id="homeHeader.HH03" /></div>
              </div>
              <div className='child-center-content'>
                <div><b><FormattedMessage id="homeHeader.HH04" /></b></div>
                <div className='subs-title'><FormattedMessage id="homeHeader.HH05" /></div>
              </div>
              <div className='child-center-content'>
                <div><b><FormattedMessage id="homeHeader.HH06" /></b></div>
                <div className='subs-title'><FormattedMessage id="homeHeader.HH07" /></div>
              </div>
            </div>
            <div className='right-content'>
              <div className='support'><i className="fas fa-question-circle"> <FormattedMessage id="homeHeader.HH08" /></i></div>
              <div className={language === LANGUAGES.VI ? 'language-vi language-active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
              <div className={language === LANGUAGES.EN ? 'language-en language-active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
            </div>
          </div>
        </div>
        <div className='home-header-banner'>
          <div className='home-header-banner-up'><div className='title-small'><FormattedMessage id="homeHeader.HH09" /></div>
            <div className='title-big'><FormattedMessage id="homeHeader.HH10" /></div>
            <div className='banner-search'>
              <i className="fas fa-search"></i>
              <input className='banner-input-search' placeholder='Tìm chuyên khoa khám bệnh' />
            </div></div>
          <div className='home-header-banner-down'>
            <div className='options'>
              <div className='options-item'>
                <div className='options-item-icon'><i className="fas fa-hospital-alt"></i></div>
                <div className='options-item-title'><FormattedMessage id="homeHeader.HH11" /></div>
              </div>
              <div className='options-item'>
                <div className='options-item-icon'><i className="fas fa-mobile"></i></div>
                <div className='options-item-title'><FormattedMessage id="homeHeader.HH12" /></div>
              </div>
              <div className='options-item'>
                <div className='options-item-icon'><i className="fas fa-procedures"></i></div>
                <div className='options-item-title'><FormattedMessage id="homeHeader.HH13" /></div>
              </div>
              <div className='options-item'>
                <div className='options-item-icon'><i className="fas fa-flask"></i></div>
                <div className='options-item-title'><FormattedMessage id="homeHeader.HH14" /></div>
              </div>
              <div className='options-item'>
                <div className='options-item-icon'><i className="fas fa-user-md"></i></div>
                <div className='options-item-title'><FormattedMessage id="homeHeader.HH15" /></div>
              </div>
              <div className='options-item'>
                <div className='options-item-icon'><i className="fas fa-notes-medical"></i></div>
                <div className='options-item-title'><FormattedMessage id="homeHeader.HH16" /></div>
              </div>
            </div>
          </div>


        </div>
      </React.Fragment>

    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguageView: (language) => dispatch(changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHeader);
