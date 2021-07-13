import React, { Component } from "react";
import Particles from "react-tsparticles";
export class ParticlesComponent extends Component {
  constructor(props: any) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main: any) {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    main.load("tsparticles", {
      fullScreen: {
        enable: true,
      },
      fpsLimit: 60,
      particles: {
        groups: {
          z5000: {
            number: {
              value: 70,
            },
            zIndex: {
              value: 5000,
            },
          },
          z7500: {
            number: {
              value: 30,
            },
            zIndex: {
              value: 7500,
            },
          },
          z2500: {
            number: {
              value: 50,
            },
            zIndex: {
              value: 2500,
            },
          },
          z1000: {
            number: {
              value: 40,
            },
            zIndex: {
              value: 1000,
            },
          },
        },
        number: {
          value: 200,
          density: {
            enable: false,
            value_area: 800,
          },
        },
        color: {
          value: "#872525",
          animation: {
            enable: false,
            speed: 5,
            sync: true,
          },
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 1,
          random: false,
          animation: {
            enable: false,
            speed: 3,
            minimumValue: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
        },
        links: {
          enable: false,
          distance: 100,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          angle: {
            value: 10,
            offset: 0,
          },
          enable: true,
          speed: 1,
          direction: "right",
          random: false,
          straight: false,
          outModes: {
            default: "out",
          },
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        zIndex: {
          value: 500,
          opacityRate: 0.5,
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: false,
            mode: "repulse",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            links: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 0.8,
          },
          repulse: {
            distance: 200,
          },
          push: {
            quantity: 4,
            groups: ["z5000", "z7500", "z2500", "z1000"],
          },
          remove: {
            quantity: 2,
          },
        },
      },
      detectRetina: true,
      background: {
        color: "rgb(35, 39, 65);",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
      },
      emitters: {
        position: {
          y: 55,
          x: 0,
        },
        rate: {
          delay: 7,
          quantity: 1,
        },
        size: {
          width: 0,
          height: 0,
        },
        // particles: {
        //   shape: {
        //     type: "images",
        //     options: {
        //       images: {
        //         src: "https://particles.js.org/images/cyan_amongus.png",
        //         width: 500,
        //         height: 634
        //       }
        //     }
        //   },
        //   size: {
        //     value: 40
        //   },
        //   move: {
        //     speed: 10,
        //     outModes: {
        //       default: "destroy",
        //       left: "none"
        //     },
        //     straight: true
        //   },
        //   zIndex: {
        //     value: 0
        //   },
        //   rotate: {
        //     value: {
        //       min: 0,
        //       max: 360
        //     },
        //     animation: {
        //       enable: true,
        //       speed: 10,
        //       sync: true
        //     }
        //   }
        // }
      },
    });
  }

  particlesLoaded(container: any) {
    console.log(container);
  }

  render() {
    return (
      <Particles
        id="tsparticles"
        url="http://foo.bar/particles.json"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
      />
    );
  }
}
