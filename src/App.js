import {
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import { Link } from "react-router-dom";
import { brands, SNEAKERS, filterByBrand } from "./shoes";
import "./App.css";
console.clear();

export default function App() {
  function ListAllBrands() {
    return (
      <>
        <CustomLink to="/">All</CustomLink>
        {brands.map((brand) => {
          return (
            <CustomLink key={brand} to={`/${brand.toLowerCase()}`}>
              {brand}
            </CustomLink>
          );
        })}
        <hr />
        <Outlet />
      </>
    );
  }

  function AllShoes({ sneakers }) {
    return (
      <>
        {sneakers.map((shoe) => {
          return (
            <div key={shoe.id}>
              <img src={shoe.imageUrl} />
              <p>Name: {shoe.colorway}</p>
              <p>Brand: {shoe.model}</p>
            </div>
          );
        })}
      </>
    );
  }

  function CustomLink({ to, children, ...props }) {
    return (
      <li>
        <Link
          key={children}
          className="link"
          style={{ textDecoration: "none", hover: "pointer" }}
          to={to}
        >
          {children}
        </Link>
      </li>
    );
  }

  //  For the createBrowser method
  // function assignRouter() {
  //   let router = [
  //     {
  //       path: "/",
  //       Component() {
  //         return (
  //           <>
  //             <ListAllBrands />;
  //           </>
  //         );
  //       },
  //       loader: () => <p>Loading all brands...</p>,
  //       children: [
  //         {
  //           index: true,
  //           Component() {
  //             return <AllShoes sneakers={SNEAKERS} />;
  //           },
  //         },
  //       ],
  //     },
  //   ];
  //   for (let brand of brands) {
  //     router[0].children.push({
  //       path: `/${brand.toLowerCase()}`,
  //       Component() {
  //         return <AllShoes sneakers={filterByBrand(brand.toLowerCase())} />;
  //       },
  //       loader: () => <p>Loading {brand} shoes...</p>,
  //     });
  //   }
  //   return createBrowserRouter(router);
  // }

  return (
    <>
      <h1>Custom Filter Link Example</h1>

      <p>
        This example demonstrates how to create a "filter link" like one that is
        commonly used to filter a list of products on an e-commerce website. The
        <code>&lt;BrandLink&gt;</code> component is a custom{" "}
        <code>&lt;Link&gt;</code> that knows whether or not it is currently
        "active" by what is in the URL query string.
      </p>
      {/* For the createBrowserRouter method      <RouterProvider router={assignRouter()} /> */}

      <Routes>
        <Route path="/" element={<ListAllBrands />}>
          <Route index element={<AllShoes sneakers={SNEAKERS} />}></Route>
          {brands.map((brand) => {
            let shoes = filterByBrand(brand);
            console.log(shoes, brand);
            return (
              <Route
                key={brand}
                path={brand.toLocaleLowerCase()}
                element={<AllShoes sneakers={shoes} />}
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}
