import React, { Component } from 'react';

class Testimonial extends Component {
    state = {  }
    render() { 
        return ( 
              <section className="testimonials text-center bg-light" id="testimonials">
                <div className="container">
                  <h2 className="mb-3">Kata Upin Ipin...</h2>
                  <hr className="divider my-4" />
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                        <img
                          className="img-fluid rounded-circle mb-3"
                          src="./image/kacamata.png"
                          alt=""
                        />
                        <h5>Margaret E.</h5>
                        <p className="font-weight-light mb-0">
                          "This is fantastic! Thanks so much guys!"
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                        <img
                          className="img-fluid rounded-circle mb-3"
                          src="./image/ui.png"
                          alt=""
                        />
                        <h5>Fred S.</h5>
                        <p className="font-weight-light mb-0">
                          "Bootstrap is amazing. I've been using it to create lots of super
                          nice landing pages."
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                        <img
                          className="img-fluid rounded-circle mb-3"
                          src="./image/eneng.png"
                          alt=""
                        />
                        <h5>Sarah W.</h5>
                        <p className="font-weight-light mb-0">
                          "Thanks so much for making these free resources available to us!"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
         );
    }
}
 
export default Testimonial;