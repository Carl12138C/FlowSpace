import AddFriendModal from "../../frontend/src/components/Chat/AddFriendModal";
import { getUserContext } from "../../frontend/src/context/AuthContext";
import { AuthContext } from "../../frontend/src/context/AuthContext";

describe("AddFriendModal.cy.jsx", () => {
    before(() => {});

    it("playground", () => {
        cy.mount(
            <AuthContext>
                <AddFriendModal/>
            </AuthContext>
        );
    });
});
