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
  FormFeedback,
  Label,
  Input,
  FormGroup,
  Form,
} from "reactstrap";
import { fetchPackage } from "../../api";
import { useDispatch } from "react-redux";
import { createPackage } from "../../Actions/packages";

const data = {
  title: "",
  destination: "",
  departureDate: "",
  cost: "",
  description: "",
};
export default function PackageModal({ update, show, setShow, id }) {
  const [formData, setFormData] = useState(data);
  const dispatch = useDispatch();
  const fd = new FormData();
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    if (id) {
      fetchPackage(id)
        .then((res) => {
          setFormData({
            title: res.data.title,
            destination: res.data.destination,
            departureDate: res.data.departureDate,
            cost: res.data.cost,
            duration: res.data.duration,
            description: res.data.description,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFormData(data);
    }
  }, [id]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const appendFormData = () => {
    fd.append("title", formData.title);
    fd.append("destination", formData.destination);
    fd.append("date", date[0].startDate);
    fd.append("cost", formData.cost);
    fd.append("duration", differenceInDays(date[0].endDate, date[0].startDate));
    fd.append("desc", formData.description);
    fd.append("image", selectedFile);
    console.log(fd.get("date"));
  };
  const clearFormData = () => {
    for (var key of formData.keys()) {
      // here you can add filtering conditions
      formData.delete(key);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    appendFormData();
    if (update) {
    } else {
      dispatch(createPackage(fd));
    }

    //clearFormData();
  };

  //console.log(fetchPackage(id));
  return (
    <div>
      <Modal isOpen={show} toggle={() => setShow(false)}>
        <ModalHeader>{update ? "Update" : "Add"} Package</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                invalid={false}
              />
              <FormFeedback valid>
                Title Should be greater than 3 Characters
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Destination</Label>
              <Input
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                invalid={false}
              />
              <FormFeedback valid>Destination is required</FormFeedback>
            </FormGroup>
            <FormGroup>
              <div className="d-flex flex-column">
                <Label>Departure Date</Label>
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  showSelectionPreview={true}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  direction="horizontal"
                  ranges={date}
                  minDate={new Date()}
                />
              </div>
              <FormFeedback valid>Date is required</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Cost</Label>
              <Input
                name="cost"
                value={formData.cost}
                type="Number"
                onChange={handleChange}
                invalid={false}
                min="0"
              />
              <FormFeedback valid>
                Title Should be greater than 3 Characters
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                name="description"
                value={formData.description}
                type="textarea"
                invalid={false}
                onChange={handleChange}
                rows="4"
              />
              <FormFeedback valid>
                Description should be more than 15 characters
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input
                id="exampleFile"
                name="file"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                invalid={false}
              />
              <FormFeedback invalid>Image is required</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button color="primary" onClick={handleSubmit}>
            {update ? "Update" : "Add"}
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}
