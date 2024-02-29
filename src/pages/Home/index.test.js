import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {

    /* Test de l'affichage de la liste des événements */

    render(< Home />)
    expect(screen.getByTestId("eventList")).toBeInTheDocument()

  })
  it("a list a people is displayed", async () => {

    /* Test de l'affichage de la liste de personnes de l'équipe */

    render(< Home />)
    expect(screen.getByTestId("peopleList")).toBeInTheDocument()
    expect(screen.getByText("Samira")).toBeInTheDocument()
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();

  })
  it("a footer is displayed", async () => {

    /* Test de l'affichage du footer */

    render(< Home />)
    expect(screen.getByTestId("footer")).toBeInTheDocument()
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument()

  })
  it("an event card, with the last event, is displayed", async () => {

    /* Test de l'affichage du dernier évenement */

    render(< Home />)
    await waitFor(() => {
      expect(screen.getByTestId("last")).toBeInTheDocument()
    });

  })
});
