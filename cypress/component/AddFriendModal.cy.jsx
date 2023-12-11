import { AuthContext } from "../../frontend/src/context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import Register from "../../frontend/src/pages/Register";
import { useState } from "react";
import { StreamChat } from "stream-chat";

const ComponentWrapper = ({ children }) => {
    const [userData, setUserData] = useState();
    return (
        <MemoryRouter initialEntries={["/"]}>
            <AuthContext value={{ userData, setUserData }}>
                {children}
            </AuthContext>
        </MemoryRouter>
    );
};

describe("Register.cy.jsx", () => {
    beforeEach(() => {
        cy.mount(<ComponentWrapper>
            <Register/>
        </ComponentWrapper>)
    })

    it("Input New Username", () => {
        cy.get()
    });

    it("Input New User email", () => {
        cy.get()
    });

});
