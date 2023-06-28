import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const Forum = ({ animate, setAnimate }) => {
  const [stepIndex, setStepIndex] = useState(0);
    const [serviceIndex, setServiceIndex] = useState(0);
    const [choiceIndex, setChoiceIndex] = useState(0);

    interface ServiceOptionData {
      capacity: number;
      onNetMin: number;
      offNetMin: number;
      onNetSMS: number;
      offNetSMS: number;
      price: number;
    }
    
    interface Service {
      title: string;
      description: string;
      image: string;
      optionText: string;
      options?: string[];
      optionsData?: ServiceOptionData[];
      outerElement?: JSX.Element;
    }
    
    interface Step {
      title?: string;
      description?: string;
      child: () => JSX.Element;
    }
  
    const services: Service[] = [
      {
        title: "Router (4G- 5G - custom of date)",
        description:
          "Got it, so a mix of performance and price. What will you regularly use your phone for?",
        image: "icons/router (1) 1.svg",
        optionText: "Speed",
        options: [
          "4G ( Unlimited )",
          "5G ( Unlimited )",
          "2GB",
          "5GB",
          "10GB",
          "50GB",
          "100GB",
          "300GB",
          "600GB",
        ],
      },
      {
        title: "Fiber (Speed)",
        description:
          "Got it, so a mix of performance and price. What will you regularly use your phone for?",
        image: "icons/optical-fiber 1.svg",
        optionText: "Speed",
        options: ['500 Speed', '200 Speed', '100 Speed'],
      },
      {
        title: "SIM (package) & number of lines",
        description: "",
        image: "icons/simcard.svg",
        optionText: "Choose the best plan for you",
        optionsData: [
          {
            capacity: 100,
            onNetMin: 2411,
            offNetMin: 425,
            onNetSMS: 5362,
            offNetSMS: 632,
            price: 2.62,
          },
          {
            capacity: 100,
            onNetMin: 2411,
            offNetMin: 425,
            onNetSMS: 5362,
            offNetSMS: 632,
            price: 2.62,
          },
          {
            capacity: 100,
            onNetMin: 2411,
            offNetMin: 425,
            onNetSMS: 5362,
            offNetSMS: 632,
            price: 2.62,
          },
          {
            capacity: 100,
            onNetMin: 2411,
            offNetMin: 425,
            onNetSMS: 5362,
            offNetSMS: 632,
            price: 2.62,
          },
        ],
        outerElement: (
          <div className="form-group mb-3">
            <label htmlFor="exampleTextField">How many lines do you want?</label>
            <input
              type="text"
              className="form-control"
              id="exampleTextField"
              placeholder="Enter text"
            />
          </div>
        ),
      },
      {
        title: "Transfer to another operator",
        description:
          "Got it, so a mix of performance and price. What will you regularly use your phone for?",
        image: "icons/transfer.svg",
        optionText: "Speed",
        options: ["1", "2", "3"],
      },
    ];
  
    const steps : Step[] = [
      {
        title: "Tygo business",
        description:
          "Got it, so a mix of performance and price. What will you regularly use your phone for?",
        child: () => (
          <Services
            services={services}
            stepIndex={stepIndex}
            setStepIndex={setStepIndex}
            setServiceIndex={setServiceIndex}
          />
        ),
      },
      {
        title: services[serviceIndex].title,
        description: services[serviceIndex].description,
        child: () => (
          <ServiceOptions
            stepIndex={stepIndex}
            setStepIndex={setStepIndex}
            choiceIndex={choiceIndex}
            setChoiceIndex={setChoiceIndex}
            serviceIndex={serviceIndex}
            services={services}
          />
        ),
      },
      {
        title: "Tygo business",
        description:
          "Got it, so a mix of performance and price. What will you regularly use your phone for?",
        child: () => <Login stepIndex={stepIndex} setStepIndex={setStepIndex} />,
      },
      {
        child: () => (
          <div className="d-flex h-100 align-items-end">
            <div className="pb-5 fs-4 text-center">
              We will contact with you Soon ( Order.Number : 324432 )
            </div>
          </div>
        ),
      },
    ];
    
    const [innerComponent, setInnerComponent] = useState(<></>);
  
    useEffect(() => {
      setInnerComponent(steps[stepIndex].child);
    }, [stepIndex, choiceIndex]);
  
    useEffect(() => {
      setAnimate(true);
    }, [stepIndex])
  
    return (
      <div className="from-wrapper">
      <div className="card-bg d-flex p-4 flex-column align-items-start row-gap-3 overflow-x-hidden overflow-y-auto">
                <Indicators active={stepIndex} length={3} />
                {innerComponent && (
                  <InnerContent
                    step={steps[stepIndex]}
                    stepIndex={stepIndex}
                    setStepIndex={setStepIndex}
                    child={innerComponent}
                  />
                )}
              </div>
      </div>
    );
    }
const CheckBox = ({ checked } : {checked: boolean}) => {
    return (
      <div className="checkbox">
        <div className={`checked ${checked ? "" : "hidden"}`}></div>
      </div>
    );
  };
  
  const Services = ({ services, stepIndex, setStepIndex, setServiceIndex } : { services: Service[], stepIndex: number, setStepIndex: Dispatch<SetStateAction<number>>, setServiceIndex: Dispatch<SetStateAction<number>> }) => {
    const onStepIndexChange = (index: number) => {
      setStepIndex(index);
    };
  
    const onServiceIndexChange = (index: number) => {
      setServiceIndex(index);
    };
  
    return (
      <div className="services">
        <h2 className="fs-5 fw-semibold my-4">Services</h2>
        <div className="list row align-items-stretch">
          {services.map((item, index) => (
            <div className="col-12 col-sm-6 pb-4 d-box">
              <div
                className="service h-100 d-flex p-4 position-relative flex-column align-items-start"
                key={index}
                onClick={() => {
                  onServiceIndexChange(index);
                  onStepIndexChange(stepIndex + 1);
                }}
              >
                <img className="logo" src={item.image} alt={item.title} />
                <h3 className="fs-6 fw-semibold">{item.title}</h3>
                <img className="next" src="icons/arrow-left.svg" alt="next" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const ServiceOptions = ({
    stepIndex,
    setStepIndex,
    choiceIndex,
    setChoiceIndex,
    serviceIndex,
    services,
  } : {
    stepIndex: number,
    setStepIndex: Dispatch<SetStateAction<number>>,
    choiceIndex: number,
    setChoiceIndex: Dispatch<SetStateAction<number>>,
    serviceIndex: number,
    services: Service[]
  }) => {
    const OnChoiceClicked = (index: number) => {
      setChoiceIndex(index);
    };
  
    return (
      <>
        <div className="options mb-2 pt-2 overflow-y-auto position-relative flex-grow-1">
          {services[serviceIndex].outerElement != null ? (
            services[serviceIndex].outerElement
          ) : (
            <></>
          )}
          <h2 className="fs-5 py-2 fw-semibold">
            {services[serviceIndex].optionText}
          </h2>
          {services[serviceIndex].options != null ? (
            <div className="togglesList" style={{ height: 0 }}>
              {services[serviceIndex].options.map((option, index) => (
                <div
                  className="option d-flex column-gap-3 align-items-center"
                  key={index}
                  onClick={() => {
                    OnChoiceClicked(index);
                  }}
                >
                  <CheckBox checked={index == choiceIndex} />
                  <p>{option}</p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="containersList d-flex flex-column align-items-start row-gap-4"
              style={{ height: 0 }}
            >
              {services[serviceIndex].optionsData.map((option, index) => (
                <div
                  className="option d-flex p-4 align-items-center w-100 fw-medium rounded-3"
                  key={index}
                  onClick={() => {
                    OnChoiceClicked(index);
                  }}
                >
                  <div className="capacity d-flex align-items-center column-gap-3">
                    <CheckBox checked={index == choiceIndex} />
                    <p>{option.capacity} GB</p>
                  </div>
                  <div className="net">
                    <div className="row">
                    <p className="netlabel my-1 my-sm-0 text-center col-12 col-md-6">
                      ON-net min :{" "}
                      <span className="netvalue">{option.onNetMin}</span>
                    </p>
                    <p className="netlabel my-1 my-sm-0 text-center col-12 col-md-6">
                      OFF-net min :{" "}
                      <span className="netvalue">{option.offNetMin}</span>
                    </p>
                    <p className="netlabel my-1 my-sm-0 text-center col-12 col-md-6">
                      ON-net SMS :{" "}
                      <span className="netvalue">{option.onNetSMS}</span>
                    </p>
                    <p className="netlabel my-1 my-sm-0 text-center col-12 col-md-6">
                      OFF-net SMS :{" "}
                      <span className="netvalue">{option.offNetSMS}</span>
                    </p>
                    </div>
                  </div>
                  <div className="mx-4 divider"></div>
                  <p>{option.price} SR</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className="button position-sticky bottom-0 start-0"
          onClick={() => setStepIndex(stepIndex + 1)}
        >
          Next
        </div>
      </>
    );
  };
  
  const InnerContent = ({
    step,
    stepIndex,
    setStepIndex,
    child
  }: {
    step: Step,
    stepIndex: number,
    setStepIndex: Dispatch<SetStateAction<number>>,
    child: JSX.Element
  }) => {
    return (
      <div className="content d-flex flex-column w-100 h-100">
        {stepIndex === 0 ? (
          <></>
        ) : (
          <img
            className="back mb-2"
            src="icons/arrow-left.svg"
            alt="back"
            onClick={() => {
              setStepIndex(stepIndex - 1);
              console.log(stepIndex);
            }}
          />
        )}
        {step.title != null && step.description != null ? (
          <div className="title">
            <h1 className="fw-bold mb-2">{step.title}</h1>
            <p>{step.description}</p>
          </div>
        ) : (
          <></>
        )}
        {child}
      </div>
    );
  };
  
  const Login = ({ stepIndex, setStepIndex } : {stepIndex: number, setStepIndex: Dispatch<SetStateAction<number>>}) => {
    const OnFormSubmit = (event: any) => {
      event.preventDefault(); // Prevents the default form submission behavior
  
      // Perform any additional actions or validations here
  
      // Example: Log form data to the console
      var form = event.target;
      setStepIndex(stepIndex + 1);
    };
  
    return (
      <form onSubmit={OnFormSubmit}>
        <div className="form-group my-3 group">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            placeholder="Khalil Abulail"
          />
        </div>
        <div className="form-group my-3 group">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            placeholder="khalilmohabulail@gmail.com|"
          />
        </div>
        <div className="row row-gap-3 group">
          <div className="form-group col-12 col-sm-6">
            <label htmlFor="city">City</label>
            <input
              required
              type="text"
              className="form-control"
              id="city"
              placeholder="Jada"
            />
          </div>
          <div className="form-group col-12 col-sm-6">
            <label htmlFor="phone">Phone Number</label>
            <input
              required
              type="number"
              className="form-control"
              id="phone"
              placeholder="+962791759617"
            />
          </div>
        </div>
        <div className="form-check form-group mt-2 mb-3">
          <input
            required
            className="form-check-input"
            type="checkbox"
            id="gridCheck"
          />
          <label className="form-check-label" htmlFor="gridCheck">
            Agree on our condition
          </label>
        </div>
        <button type="submit" className="button">
          Order
        </button>
      </form>
    );
  };
  
  const Indicators = ({ active, length }) => {
    return (
      <div className="indicators">
        {Array.from({ length }).map((_, index) => {
          return (
            <div
              className={`indicator rounded-pill col ${
                index > active || active >= length ? "opacity-0" : ""
              }`}
              key={index}
            ></div>
          );
        })}
      </div>
    );
  };

 

  export default Forum;