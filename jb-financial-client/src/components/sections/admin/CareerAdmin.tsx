import React, { useState, useEffect } from "react";
import CareerAdminForm from "../../admin/CareerAdminForm";
import CareerAdminTable from "../../admin/CareerAdminTable";
import { SERVER_URL } from "../../../Constants";

interface CareerContent {
  heading: string;
  paragraphs: string[];
}

interface Career {
  _id?: string;
  title: string;
  location: string;
  category: string;
  tags: string[];  // Updated to array of strings
  content: CareerContent[];
}

const CareerAdmin: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      const response = await fetch(`${SERVER_URL}/api/jobs`);
      const careersData: Career[] = await response.json();
      setCareers(careersData);
    };

    fetchCareers();
  }, []);

  const handleEdit = (career: Career) => {
    setSelectedCareer({...career
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/careers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedCareers = careers.filter((career) => career._id !== id);
        setCareers(updatedCareers);
      } else {
        console.error("Failed to delete career");
      }
    } catch (error) {
      console.error("Error deleting career:", error);
    }
  };

  const handleAdd = () => {
    const newCareer: Career = {
      title: "",
      location: "",
      category: "",
      tags: [],
      content: [],
    };
    setSelectedCareer(newCareer);
  };

  const handleSave = async (career: Career) => {
    try {
      if (career._id) {
        // Update existing career
        const response = await fetch(`${SERVER_URL}/api/careers/${career._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(career),
        });

        if (response.ok) {
          const updatedCareer = await response.json();
          console.log("Career updated successfully:", updatedCareer);

          const updatedCareers = careers.map((c) =>
              c._id === career._id ? updatedCareer : c
          );
          setCareers(updatedCareers);
        } else {
          console.error("Failed to update career");
        }
      } else {
        // Create new career
        const response = await fetch(`${SERVER_URL}/api/careers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(career),
        });

        if (response.ok) {
          const newCareer = await response.json();
          setCareers([...careers, newCareer]);
        } else {
          console.error("Failed to create career");
        }
      }

      setSelectedCareer(null);
    } catch (error) {
      console.error("Error saving career:", error);
    }
  };

  const handleCancel = () => {
    setSelectedCareer(null);
  };

  return (
      <section className="w-full bg-off-white px-4 py-8 md:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16 items-start">
        <h3 className="switzer-sb text-xl md:text-4xl">Careers</h3>
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 w-full">
          <div className="w-full md:w-1/4">
            <div className="overflow-x-auto">
              <CareerAdminTable
                  careers={careers}
                  onEdit={handleEdit}
                  onDelete={(id) => handleDelete(id)}
                  onAdd={handleAdd}
              />
            </div>
          </div>
          <div className="w-full md:w-3/4">
            {selectedCareer && (
                <CareerAdminForm
                    career={selectedCareer}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
          </div>
        </div>
      </section>
  );
};

export default CareerAdmin;