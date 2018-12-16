import React, { Component } from 'react';
import Config from '../config';

class MemberPopup extends Component {
  member = this.props.member;

  closeMember() {
    document.querySelector('#member-popup').classList.remove('active');
    document
      .querySelector('.app-content>div>.container')
      .classList.remove('hide');
    document.querySelector('header').classList.remove('hide');
  }

  toogleSkills() {
    const skillsElement = document.querySelector('.popup-top--skills');
    const isActive = skillsElement.classList.contains('active');

    if (isActive) {
      skillsElement.classList.remove('active');
    } else {
      skillsElement.classList.add('active');
    }
  }

  render() {
    const skillsList = this.member.skills_list.split('#');
    const softwareList = this.member.software_list.split('#');
    skillsList.shift();
    softwareList.shift();

    return (
      <div>
        <div className="member-popup--bg">
          <svg viewBox="0 0 868 675" version="1.1">
            <g id="2—Member">
              <g
                id="g—member-1"
                transform="translate(-312.000000, -135.000000)"
                fill="#000000"
              >
                <g id="Group" transform="translate(305.000000, 71.000000)">
                  <path
                    d="M315.94402,442.432726 L315.399969,442.432726 L441.172002,225 L570.564325,448.689911 L570.669553,448.689911 L721,709 L420.782407,708.830162 L420.780168,708.825693 L417.083756,708.827927 L412.684332,708.825693 L412.68881,708.830162 L162,709 L315.94402,442.432726 Z M117.926074,785.120909 L136.823436,752.375209 L178.878012,752.346141 L440.998881,752.167264 L703.119749,752.346141 L720.450166,752.357321 L720.450166,752.375209 L882,752.375209 L881.59931,751.77597 L659.731031,367.313056 L659.666114,367.422618 L484.32716,64.064843 L434.816162,64.064843 L657.351512,449.071097 L657.420905,449.071097 L807.726787,709.527421 L769.941017,709.527421 L616.024446,442.810397 L615.930429,442.810397 L397.104263,64.2191245 L397.016961,64 L174.481611,449.006254 L175.124059,449.006254 L0,752.473591 L24.7845996,795.285603 L247.053569,410.125068 L246.760326,409.617504 L396.999053,149.693339 L415.916562,182.427859 L261.79181,449.071097 L262.360387,449.071097 L43.7961245,827.818887 L43.6483839,828 L222.528635,827.877022 L440.998881,827.727212 L659.469127,827.877022 L838.349378,828 L838.203875,827.818887 L863.1004,785.120909 L117.926074,785.120909 Z"
                    id="Fill-6"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
        {this.member.photo && (
          <div
            className="popup--bg"
            style={{
              backgroundImage: `url(${Config.host + this.member.photo.url})`,
            }}
          />
        )}
        <div className="popup--wrap">
          <div className="popup--header">
            <button className="popup--close" onClick={this.closeMember}>
              <svg viewBox="0 0 16 16" version="1.1">
                <g id="2—Member">
                  <g
                    id="g—member-1"
                    transform="translate(-72.000000, -37.000000)"
                    fill="#000000"
                  >
                    <g id="Head" transform="translate(65.000000, 30.000000)">
                      <g
                        id="Close"
                        transform="translate(14.849242, 14.849242) rotate(-45.000000) translate(-14.849242, -14.849242) translate(4.349242, 4.349242)"
                      >
                        <polygon
                          id="Rectangle-2"
                          points="1 9 20 9 21 10.0050829 21 11.0061693 20 12 1 12 0 11.004758 0 10.0034919"
                        />
                        <polygon
                          id="Rectangle-2-Copy"
                          transform="translate(10.500000, 10.500000) rotate(-270.000000) translate(-10.500000, -10.500000) "
                          points="1 9 20 9 21 10.0050829 21 11.0061693 20 12 1 12 0 11.004758 0 10.0034919"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <div className="logo" />
          </div>
          <div className="popup--content">
            <div className="container">
              <div className="popup-top">
                <div className="popup-top--info">
                  <div className="info--name">{this.member.name}</div>
                  <div className="info--position">{this.member.position}</div>
                </div>
                <div className="popup-top--skills">
                  <button className="open-skills" onClick={this.toogleSkills}>
                    Skills
                    <span>
                      <svg viewBox="0 0 21 12" version="1.1">
                        <g id="2—Member" stroke="none">
                          <g
                            id="g—member-1"
                            transform="translate(-1275.000000, -166.000000)"
                            fill="#000000"
                          >
                            <g
                              id="Skills-close"
                              transform="translate(1170.000000, 156.000000)"
                            >
                              <polygon
                                id="arrow-down"
                                transform="translate(115.143818, 15.782038) rotate(-270.000000) translate(-115.143818, -15.782038) "
                                points="117.38596 15.7803558 109.365144 7.75954049 109.36178 6.34869134 110.069782 5.64068932 111.486465 5.63822015 120.925856 15.0776114 120.921493 16.4874626 111.486465 25.9224914 110.075615 25.9258558 109.367613 25.2178538 109.365144 23.8011711"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </button>
                  <div className="skills-description">
                    {skillsList.map((skill, index) => {
                      return (
                        <div key={index}>
                          <span>0{index + 1}</span>
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberPopup;
