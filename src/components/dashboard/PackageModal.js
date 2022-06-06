import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect } from "react";
import differenceInDays from "date-fns/differenceInDays";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
  Form,
} from "reactstrap";
import { fetchPackage } from "../../api";
import { useDispatch } from "react-redux";
import { createPackage, updatePackage } from "../../Actions/packages";

const data = {
  title: "",
  destination: "",
  departureDate: "",
  cost: "",
  description: "",
};
export default function PackageModal({ update, show, setShow, id }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(data);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [selectedFile, setSelectedFile] = useState();
  const fd = new FormData();
  useEffect(() => {
    if (id) {
      fetchPackage(id)
        .then((res) => {
          console.log("Here");
          console.log(res);
          setFormData({
            title: res.data.title,
            destination: res.data.destination,
            cost: res.data.cost,

            description: res.data.description,
          });
          setDate([
            {
              startDate: new Date(res.data.departureDate),
              endDate: addDays(
                new Date(res.data.departureDate),
                Number(res.data.duration)
              ),
              key: "selection",
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFormData(data);
    }
  }, [id, show]);

  const checkValidity = () => {
    return (
      formData.title.length > 0 &&
      formData.destination.length > 0 &&
      formData.cost > 0 &&
      formData.description.length > 0 &&
      selectedFile
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const appendFormData = () => {
    fd.append("title", formData.title);
    fd.append("destination", formData.destination);
    fd.append("date", date[0].startDate);
    fd.append("cost", formData.cost);
    fd.append("duration", differenceInDays(date[0].endDate, date[0].startDate));
    fd.append("description", formData.description);

    fd.append("image", selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    appendFormData();
    if (update && id) {
      dispatch(updatePackage(id, fd));
    } else {
      dispatch(createPackage(fd));
    }
    setShow(false);
    //Clears fields
    setFormData(data);
    setSelectedFile();
    appendFormData();
  };

  return (
    <div>
      <Modal isOpen={show} toggle={() => setShow(false)}>
        <ModalHeader>{update ? "Update" : "Add"} Package</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Title*</Label>
              <Input
                name='title'
                value={formData.title}
                onChange={handleChange}
                minLength={3}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Destination*</Label>
              <Input
                name='destination'
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <div className='d-flex flex-column'>
                <Label>Departure Date*</Label>
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  showSelectionPreview={true}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  direction='horizontal'
                  ranges={date}
                  minDate={new Date()}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label>Cost*</Label>
              <Input
                name='cost'
                value={formData.cost}
                type='Number'
                onChange={handleChange}
                required
                min='0'
              />
            </FormGroup>
            <FormGroup>
              <Label>Description*</Label>
              <Input
                name='description'
                value={formData.description}
                type='textarea'
                minLength={15}
                require
                onChange={handleChange}
                rows='4'
              />
            </FormGroup>
            <FormGroup>
              <Label for='exampleFile'>Image{update ? "" : "*"} </Label>
              <Input
                id='exampleFile'
                name='file'
                type='file'
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button
            disabled={!checkValidity()}
            color='primary'
            onClick={handleSubmit}
          >
            {update ? "Update" : "Add"}
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}
