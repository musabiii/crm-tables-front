import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { crmApi, useGetClientsQuery } from "./crm.api";

describe("test api", () => {
  test("1", async () => {



    const Test = () => {
      console.log("hi musa");

      const { data } = useGetClientsQuery(null);

      useEffect(() => {
        console.log("data", data);
      }, [data]);

      return (
            <>
          <div>Hello</div>
          {!!data && data.map(el=><p>{el.title}</p>)}
            </>
      );
    };


    render( <ApiProvider api={crmApi}>
        <Test />
        </ApiProvider>
        );

        screen.debug();
    expect(screen.getByText("Hello")).toBeValid();
    // expect(await screen.findByText(/some/i,undefined,{timeout:2000})).toBeValid();
  });
});
