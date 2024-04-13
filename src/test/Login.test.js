import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../components/Login';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/configureStore";

describe('Login', () => {
  it('Should be rendered successfully', () => {
    const renderedComponent = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )
    expect(renderedComponent).toBeDefined();
    expect(renderedComponent).toMatchSnapshot()
  })

  it('Should disable on submit button', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toBeDefined();

    const submitButtonElement = component.getByTestId("submit");
    expect(submitButtonElement).toBeInTheDocument();

    fireEvent.click(submitButtonElement);
    expect(submitButtonElement).toBeDisabled();

  })

})
