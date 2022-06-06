import { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";
import { useSelector } from "react-redux";
import PackageModal from "./PackageModal";
import Loader from "../../layouts/loader/Loader.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPackages, deletePackage } from "../../Actions/packages";
const PackagesTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPackages());
  }, []);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState();

  const packages = useSelector((state) => {
    return state.Packages.packages;
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deletePackage(id));
  };
  return (
    <div>
      {!packages ? (
        <Loader />
      ) : (
        <Card>
          <PackageModal show={show} setShow={setShow} update={update} id={id} />
          <CardBody>
            <div className='d-flex justify-content-between'>
              <div>
                <CardTitle tag='h5'>Packages Listing</CardTitle>{" "}
                <CardSubtitle className='mb-2 text-muted' tag='h6'>
                  All packages listed
                </CardSubtitle>
              </div>
              <Button
                color='primary'
                className=''
                onClick={() => {
                  setId(null);
                  setShow(true);
                  setUpdate(false);
                }}
              >
                Add Package
              </Button>
            </div>

            <Table className='mt-3 align-middle' responsive borderless>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Departure Date</th>
                </tr>
              </thead>
              <tbody>
                {packages?.map((pack, index) => (
                  <tr key={index} className='border-top'>
                    <td>
                      <div className='d-flex align-items-center p-2'>
                        <div className='ms-3'>
                          <h6 className='mb-0'>{pack.title}</h6>
                        </div>
                      </div>
                    </td>
                    <td>{pack.departureDate.split("T")[0]}</td>

                    <td>
                      <div className='d-flex justify-content-around align-items-center p-2 w-75'>
                        <Button
                          className=' px-lg-5'
                          color='warning'
                          onClick={() => {
                            setShow(true);
                            setUpdate(true);
                            setId(pack._id);
                          }}
                        >
                          {" "}
                          Edit
                        </Button>
                        <Button
                          className='px-lg-5'
                          color='danger'
                          onClick={(e) => handleDelete(e, pack._id)}
                        >
                          {" "}
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default PackagesTable;
