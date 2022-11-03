import React from "react";
import { Nav } from "react-bootstrap";

function RegisterSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-around mb-4 w-100">
      <Nav.Item>
        {step4 ? (
          <Nav.Link>
            <small>علایق</small>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <small>علایق</small>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Nav.Link>
            <small>انتخاب آواتار</small>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <small>انتخاب آواتار</small>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Nav.Link>
            <small>تشخیص چهره</small>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <small>تشخیص چهره</small>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step1 ? (
          <Nav.Link>
            <small>اطلاعات هویتی</small>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <small>اطلاعات هویتی</small>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default RegisterSteps;
