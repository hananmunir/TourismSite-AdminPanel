import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../Actions/users";
import Loader from "../../layouts/loader/Loader";

function UserTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  });
  const users = useSelector((state) => state.Users.users);

  return (
    <>
      {users ? (
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <CardTitle tag="h5">Users Listing</CardTitle>{" "}
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  All Users listed
                </CardSubtitle>
              </div>
            </div>

            <Table className="mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Join Date</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={index} className="border-top">
                    <td>{index}</td>
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <h6 className="mb-0">{user.email}</h6>
                      </div>
                    </td>
                    <td>{user.email}</td>

                    <td>{user.createdAt.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      ) : (
        <Loader />
      )}
      ;
    </>
  );
}

export default UserTable;
