import React, { Component } from 'react';
import Config from '../config';
import showdown from 'showdown';

const converter = new showdown.Converter();

const createElementFromHTML = (htmlString) => {
  return converter.makeHtml(htmlString.trim());
}

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      members: [],
      skillsList: [],
      softwareList: []
    }
  }

  async componentDidMount() {
    let response = await fetch(`${Config.host}/members`);

    if (!response.ok) {
      return;
    }

    let members = await response.json();
    this.setState({
      loading: false,
      members: members
    });

    document.querySelectorAll('.team-member a').forEach(element => {
      if (element.dataset.image) {
        const teamImage = document.querySelector('.team--image');

        element.addEventListener('mouseenter', (event) => {
          let image = Config.host + element.dataset.image;
          teamImage.style.backgroundImage = `url(${image})`;
          teamImage.classList.add('show');
        });

        element.addEventListener('mouseleave', (event) => {
          teamImage.classList.remove('show');
        });
      }
    });
  }

  async showMember(e) {
    const id = e.currentTarget.dataset.id;
    let response = await fetch(`${Config.host}/members/${id}`);

    if (!response.ok) {
      return;
    }

    let member = await response.json();
    this.setState({
      member: member
    });

    this.setSkills();
    this.setSoftware();

    if (member !== []) {
      function getElemDistance(elem) {
        var location = 0;
        if (elem.offsetParent) {
          do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
          } while (elem);
        }
        return location >= 0 ? location : 0;
      };

      document.querySelector('#member-popup').classList.add('active');
      document.querySelector('.app-content>div>.container').classList.add('hide');
      document.querySelector('header').classList.add('hide');

      const popupElement = document.querySelector('#member-popup');
      const aboutTextBlock = document.querySelector('.member--about');
      const topOfAboutTextBlock = getElemDistance(aboutTextBlock);

      function fixNav() {
        if (!popupElement.classList.contains('show') && (window.innerHeight + popupElement.scrollTop >= topOfAboutTextBlock)) {
          popupElement.classList.add('scroll');
        } else {
          popupElement.classList.remove('scroll');
        }

        if (window.innerHeight + popupElement.scrollTop >= topOfAboutTextBlock + aboutTextBlock.clientHeight) {
          popupElement.classList.add('scrolled');
        } else {
          popupElement.classList.remove('scrolled');
        }
      }

      popupElement.addEventListener('scroll', fixNav);
    }
  }

  setSkills() {
    const skillsList = this.state.member.skills_list.split('#');
    skillsList.shift();
    this.setState({
      skillsList: skillsList
    });
  }

  setSoftware() {
    const softwareList = this.state.member.software_list.split('#');
    softwareList.shift();
    this.setState({
      softwareList: softwareList
    });
  }

  closeMember() {
    document.querySelector('#member-popup').classList.remove('active');
    document.querySelector('.app-content>div>.container').classList.remove('hide');
    document.querySelector('header').classList.remove('hide');
  }

  toogleSkills() {
    const skillsElement = document.querySelector('.popup-top--skills');
    const popupElement = document.querySelector('#member-popup');
    const isActive = skillsElement.classList.contains('active');

    if (isActive) {
      skillsElement.classList.remove('active');
      popupElement.classList.remove('show');
    } else {
      skillsElement.classList.add('active');
      popupElement.classList.add('show');
    }
  }

  async teamNavigation(e) {
    const direction = e.currentTarget.dataset.navigation;
    const currentMember = this.state.member;
    const members = this.state.members;

    const scrollToTop = () => {
      const popupElement = document.querySelector('#member-popup');
      const c = popupElement.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        popupElement.scrollTo(0, c - c / 8);
      }
    };

    let currentMemberIndex = 0;
    members.forEach((member, index) => {
      if (member.id === currentMember.id) {
        currentMemberIndex = index;
      }
    });

    let member = [];
    if (direction === 'next') {
      if (members[currentMemberIndex + 1]) {
        member = members[currentMemberIndex + 1];
      }
    } else {
      if (members[currentMemberIndex - 1]) {
        member = members[currentMemberIndex - 1];
      }
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    if (member.createdAt) {
      this.setState({
        member: member
      });

      this.setSkills();
      this.setSoftware();
      scrollToTop();
    }
  }

  render() {

    if (!this.state.loading) {
      return (
        <div className="team">
          <div className="container">
            <div className="team-container">
              <div className="team--sidebar">
                <div className="block-title">
                  <h1>About<br />Us</h1>
                </div>
                <div className="block-text">
                  <p>Geeks — независимая студия<br />
                    по разработке игр.<br />
                    Мы занимаемся полным циклом разработки игры а так же берем на себя аутсорс задачи для других студий.
                  </p>
                </div>
              </div>
              <div className="team--list">
                {this.state.members.map((member, index) => {
                  return (
                    <div className="team-member" key={member.id}>
                      <a href="#" onClick={this.showMember.bind(this)} data-id={member.id} data-image={`${(member.photo) ? member.photo.url : ''}`}>
                        <h2>{member.name}</h2>
                      </a>
                      <p>{member.position}</p>
                    </div>
                  );
                })}
                <div className="team--image"></div>
              </div>
            </div>
          </div>

          <div id="member-popup">
            {this.state.member &&
              <div>
                <div className="member-popup--bg">
                  <svg viewBox="0 0 868 675" version="1.1">
                    <g id="2—Member">
                      <g id="g—member-1" transform="translate(-312.000000, -135.000000)" fill="#000000">
                        <g id="Group" transform="translate(305.000000, 71.000000)">
                          <path d="M315.94402,442.432726 L315.399969,442.432726 L441.172002,225 L570.564325,448.689911 L570.669553,448.689911 L721,709 L420.782407,708.830162 L420.780168,708.825693 L417.083756,708.827927 L412.684332,708.825693 L412.68881,708.830162 L162,709 L315.94402,442.432726 Z M117.926074,785.120909 L136.823436,752.375209 L178.878012,752.346141 L440.998881,752.167264 L703.119749,752.346141 L720.450166,752.357321 L720.450166,752.375209 L882,752.375209 L881.59931,751.77597 L659.731031,367.313056 L659.666114,367.422618 L484.32716,64.064843 L434.816162,64.064843 L657.351512,449.071097 L657.420905,449.071097 L807.726787,709.527421 L769.941017,709.527421 L616.024446,442.810397 L615.930429,442.810397 L397.104263,64.2191245 L397.016961,64 L174.481611,449.006254 L175.124059,449.006254 L0,752.473591 L24.7845996,795.285603 L247.053569,410.125068 L246.760326,409.617504 L396.999053,149.693339 L415.916562,182.427859 L261.79181,449.071097 L262.360387,449.071097 L43.7961245,827.818887 L43.6483839,828 L222.528635,827.877022 L440.998881,827.727212 L659.469127,827.877022 L838.349378,828 L838.203875,827.818887 L863.1004,785.120909 L117.926074,785.120909 Z" id="Fill-6"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                {this.state.member.photo &&
                  <div className="popup--bg" style={{ backgroundImage: `url(${Config.host + this.state.member.photo.url})` }}></div>
                }
                <div className="popup--wrap">
                  <div className="popup--header">
                    <button className="popup--close" onClick={this.closeMember}>
                      <svg viewBox="0 0 16 16" version="1.1">
                        <g id="2—Member">
                          <g id="g—member-1" transform="translate(-72.000000, -37.000000)" fill="#000000">
                            <g id="Head" transform="translate(65.000000, 30.000000)">
                              <g id="Close" transform="translate(14.849242, 14.849242) rotate(-45.000000) translate(-14.849242, -14.849242) translate(4.349242, 4.349242)">
                                <polygon id="Rectangle-2" points="1 9 20 9 21 10.0050829 21 11.0061693 20 12 1 12 0 11.004758 0 10.0034919"></polygon>
                                <polygon id="Rectangle-2-Copy" transform="translate(10.500000, 10.500000) rotate(-270.000000) translate(-10.500000, -10.500000) " points="1 9 20 9 21 10.0050829 21 11.0061693 20 12 1 12 0 11.004758 0 10.0034919"></polygon>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </button>
                    <div className="logo">
                    </div>
                  </div>

                  <div className="container">

                    <div className="popup--container">
                      <div className="popup--sidebar">
                        <div className="popup-top--info">
                          <div className="info--name">{this.state.member.name}</div>
                          <div className="info--position">{this.state.member.position}</div>
                        </div>
                      </div>

                      <div className="popup--content">
                        {this.state.skillsList.length > 0 &&
                          <div className="popup-top--skills">
                            <div className="btn-wrap align-right">
                              <button className="open-skills" onClick={this.toogleSkills}>
                                <div title="Skills" className="link-shadow">
                                  <span>Skills</span>
                                </div>
                                <span className="icon">
                                  <svg viewBox="0 0 21 12" version="1.1">
                                    <g id="2—Member" stroke="none">
                                      <g id="g—member-1" transform="translate(-1275.000000, -166.000000)" fill="#000000">
                                        <g id="Skills-close" transform="translate(1170.000000, 156.000000)">
                                          <polygon id="arrow-down" transform="translate(115.143818, 15.782038) rotate(-270.000000) translate(-115.143818, -15.782038) " points="117.38596 15.7803558 109.365144 7.75954049 109.36178 6.34869134 110.069782 5.64068932 111.486465 5.63822015 120.925856 15.0776114 120.921493 16.4874626 111.486465 25.9224914 110.075615 25.9258558 109.367613 25.2178538 109.365144 23.8011711"></polygon>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                              </button>
                            </div>
                            <div className="skills-description">
                              <div className="article--list">
                                {this.state.skillsList.map((skill, index) => {
                                  return (
                                    <div key={index}><span>0{index + 1}</span>{skill}</div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        }
                        <div className="block-title aboutTrigger">
                          About<br />{this.state.member.name.split(' ')[0]}
                        </div>
                        <div className="member--about" dangerouslySetInnerHTML={{ __html: createElementFromHTML(this.state.member.description) }}></div>
                      </div>

                    </div>
                    <div className="popup--container">
                      <div className="popup--sidebar software">
                        <div className="popup-software">
                          <div className="software--title">Software</div>
                          <div className="software-description">
                            <div className="article--list">
                              {this.state.softwareList.map((software, index) => {
                                return (
                                  <div key={index}>{software}</div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="popup--content experience">
                        <div className="experience--list">
                          {[...Array(5)].map((element, i) => {
                            const index = i + 1;
                            const name = this.state.member['experience_' + index + '_name'];
                            const position = this.state.member['experience_' + index + '_position'];
                            const link = this.state.member['experience_' + index + '_link'];
                            const time = this.state.member['experience_' + index + '_time'];

                            return (
                              <div>
                                {name !== "" &&
                                  <div className="experience--item" key={index}>
                                    <div className="experience--info">
                                      {name !== "" &&
                                        <div className="experience--name">
                                          {name}
                                        </div>
                                      }
                                      <div className="experience--meta">
                                        {link !== "" &&
                                          <div className="experience--link">
                                            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                          </div>
                                        }
                                        {position !== "" &&
                                          <div className="experience--position">
                                            {position}
                                          </div>
                                        }
                                      </div>
                                    </div>
                                    {time !== "" &&
                                      <div className="experience--time">
                                        {time}
                                      </div>
                                    }
                                  </div>
                                }
                              </div>
                            )
                          })}
                        </div>
                      </div>

                    </div>

                    <div className="team--control">
                      <button className="member-prev" data-navigation="prev" onClick={this.teamNavigation.bind(this)}>
                        <span>
                          <svg width="12px" height="21px" viewBox="0 0 12 21" version="1.1" >
                            <g id="2—Member">
                              <g id="g—member-4" transform="translate(-1152.000000, -740.000000)" fill="#000000">
                                <g id="Scroll" transform="translate(144.000000, -219.000000)">
                                  <g id="Arrows" transform="translate(1008.000000, 959.000000)">
                                    <polygon id="arrow-L" transform="translate(5.782038, 10.143818) scale(-1, 1) translate(-5.782038, -10.143818) " points="8.02417969 10.1421356 0.00336440785 2.12132034 0 0.710471189 0.708002022 0.00246916752 2.12468475 0 11.564076 9.4393912 11.5597136 10.8492424 2.12468475 20.2842712 0.713835597 20.2876357 0.00583357537 19.5796336 0.00336440785 18.1629509"></polygon>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg></span>
                      </button>
                      <button className="member-next" data-navigation="next" data-id={this.state.member.id} onClick={this.teamNavigation.bind(this)}>
                        <span>
                          <svg width="12px" height="21px">
                            <g id="2—Member">
                              <g id="g—member-4" transform="translate(-1285.000000, -740.000000)" fill="#000000">
                                <g id="Scroll" transform="translate(144.000000, -219.000000)">
                                  <g id="Arrows" transform="translate(1008.000000, 959.000000)">
                                    <polygon id="arrow" points="141.02418 10.1421356 133.003364 2.12132034 133 0.710471189 133.708002 0.00246916752 135.124685 0 144.564076 9.4393912 144.559714 10.8492424 135.124685 20.2842712 133.713836 20.2876357 133.005834 19.5796336 133.003364 18.1629509"></polygon>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

        </div>
      );
    }

    return (<h2 className="Team-title">Waiting for API...</h2>);
  }
}

export default About;
