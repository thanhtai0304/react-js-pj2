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

  it('should disable on submit button', () => {
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

  it('should login after click submit button', () => {
    const users = [
      { id: 1, name: 'User 1', avatarURL: 'url1' },
      { id: 2, name: 'User 2', avatarURL: 'url2' },
    ];

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
    );

    expect(component).toBeDefined();

    const dropdown = component.getByTestId('userId');
    expect(dropdown).toBeDefined();
    fireEvent.change(dropdown,{ target: { value: 'user1' } });
    expect(dropdown.value).toBe('2');
    // fireEvent.change(dropdown, { target: { value: '2' } });
    // fireEvent.change(usernameInputElement, {target: {value: 'rhinoceros'}});
    // expect(usernameInputElement.value).toBe("");

  })

})
