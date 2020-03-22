import React from "react";
import AlertContainer from "react-alert";
import { RingLoader } from "react-spinners";

import HeaderBar from "../components/HeaderBar";
import TitleSection from "../components/TitleSection";
import routes from "../constants/routes";
import strings from "../constants/strings";
import * as colors from "../constants/colors";
import * as options from "../constants/options";
import * as NetworkUtils from "../utils/NetworkUtils";
import "./Prayer.scss";

class Next extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phone: "",
      contact: false,
      prayer: "",
      loading: false
    };
  }

  onFormSubmit() {
    if (this.isFormValid()) {
      if (!this.state.loading) {
        this.setState({ loading: true });
        this.sendToSheets();
      }
    }
  }

  isFormValid() {
    this.hideErrors();
    if(this.state.prayer === '') {
      this.showError('Please enter a prayer prayer');
      return false;
    }
    return true;
  }

  sendToSheets() {
    const successHandler = () => {
      this.showSuccess();
    };
    const errorHandler = () => {
      this.showError("An error occurred");
    };
    NetworkUtils.sendToSheets(
      "prayer",
      this.state,
      successHandler,
      errorHandler,
      process.env.PRAYER_SHEETS_URL
    );
  }

  hideErrors() {
    this.msg.removeAll();
  }

  showError(msg) {
    this.msg.error(msg, {
      onClose: () => {
        this.setState({ loading: false });
      }
    });
  }

  showSuccess() {
    this.setState({ loading: false });
    this.msg.success("Successfully sent", {
      onClose: () => {
        this.props.history.push(routes.home);
      }
    });
  }

  render() {
    return (
      <div className="prayer">
        <AlertContainer ref={a => (this.msg = a)} {...options.ALERT_OPTIONS} />
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.prayerHeader}
          color={colors.PRAYER_THEME}
        />
        <div className="page-wrapper">
          <TitleSection
            title={strings.prayerTitle}
            description={strings.prayerDescription}
          />
          <form autoComplete="on">
            <h3>CONTACT INFO</h3>
            <label>Name (optional)</label>
            <div className="row">
              <input
                className="left"
                type="text"
                name="full name"
                autoComplete="given-name"
                placeholder="Full name"
                value={this.state.fullName}
                onChange={e => this.setState({ fullName: e.target.value })}
              />
            </div>
            <label>Phone (optional)</label>
            <div className="row">
              <input
                type="number"
                name="phone"
                autoComplete="tel"
                placeholder="4161234567"
                value={this.state.phone}
                onChange={e => this.setState({ phone: e.target.value })}
              />
            </div>
            <div className='row checkbox'>
              <input
                type='checkbox'
                id='follow-up'
                value={this.state.contact}
                onChange={(e) => this.setState({contact: e.target.checked})}
              />
              <label htmlFor="follow-up">
                Please follow up with me
              </label>
            </div>

            <div className="prayer-wrapper">
              <label>How can we pray for you?</label>
              <div className="row">
                <textarea
                  type="text"
                  name="prayer"
                  placeholder="Add your prayer request"
                  cols="10" 
                  value={this.state.prayer}
                  onChange={e => this.setState({ prayer: e.target.value })}
                />
              </div>
              <p className="disclaimer">
                Privacy: All prayer prayers will only be shared with individuals on
                the prayer team and/or the church leadership team.
              </p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: colors.PRAYER_THEME }}
              onClick={() => this.onFormSubmit()}
            >
              Submit Prayer Request
            </button>
          </form>
        </div>
        <div
          className="loading-spinner"
          style={{ visibility: this.state.loading ? "visible" : "hidden" }}
        >
          <RingLoader color={colors.PRAYER_THEME} loading={true} />
        </div>
      </div>
    );
  }
}

export default Next;
