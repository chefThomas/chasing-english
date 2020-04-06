import React, { Component } from 'react';
import { Button } from 'antd';
class RefundPolicy extends Component {
  state = {
    showPolicy: false,
  };
  render() {
    return (
      <>
        <Button
          onClick={() => this.setState({ showPolicy: !this.state.showPolicy })}
          type="link"
          style={{ display: 'block', marginLeft: 'auto' }}
        >
          Refund and Credit Policy
        </Button>
        <div style={{ display: !this.state.showPolicy ? 'none' : null }}>
          <p>
            We offer credit and refund options should you need to withdraw your
            student from a program. Please note that both options require a
            minimum of two weeks notice prior to the program's scheduled start
            date. We appreciate your understanding that this two-week window
            allows Chasing English, as a small independent business, time to
            allow other students to fill spots that would otherwise go empty.
          </p>
          <p>
            <strong>
              No refunds will be provided once courses have begun.
            </strong>
          </p>
          <p>The two options are as follows:</p>
          <p>
            <strong>Credit</strong>
            <br></br>
            Credit for a program of equal or lesser value to be honored up to
            one full-year from the date of initial payment. When you are ready
            to redeem a program, simply reach out to Chasing English.
          </p>
          <p>
            <strong>Refund</strong>
            <br></br>A refund minus a processing fee will be submitted to the
            payment method used. Refund processing typically takes 5-10 days
            depending on the bank or card issuer.
            <p>
              The non-refundable processing fee is charged by{' '}
              <a
                href="https://stripe.com/pricing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe
              </a>
              , the secure online payment service we use, at a rate of 2.9%,
              plus $0.30.{' '}
            </p>
          </p>
        </div>
      </>
    );
  }
}

export default RefundPolicy;
