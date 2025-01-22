import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, List, Input, Table, Tag } from "antd";
import { getData } from "../utils/api";
import CompanyListItem from "../components/CompanyListItem";
import { SearchOutlined, SolutionOutlined } from "@ant-design/icons";
import { capitalizeFirstLetter } from "../utils/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const ListCompany = () => {
  const [dataCompany, setDataCompany] = useState([]);
  const [dataArchitect, setDataArchitect] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companySearchText, setCompanySearchText] = useState("");
  const [architectSearchText, setArchitectSearchText] = useState("");

  const columns = [
    {
      title: " Architect Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "35%",
      ellipsis: true,
    },
    {
      title: "Experience",
      dataIndex: "experience_years",
      key: "experience_years",
      width: "15%",
      align: "center",
      render: (_, { experience_years }) => {
        let suffix = experience_years > 1 ? "Years" : "Year";
        return `${experience_years} ${suffix}`;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      align: "center",
      render: (_, { status }) => {
        let color = status === "available" ? "#87d068" : "#f50";
        return (
          <Tag color={color} key={status}>
            {capitalizeFirstLetter(status)}
          </Tag>
        );
      },
    },
  ];

  const CustomCell = (props) => (
    <td
      {...props}
      style={{
        background: "#f6f8fa",
        padding: "12px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 0,
        // borderRadius: "10px"
      }}
    >
      {props.children}
    </td>
  );

  const CustomHeaderCell = (props) => (
    <th
      {...props}
      style={{
        background: "#1890ff",
        color: "#fff",
        padding: "12px",
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {props.children}
    </th>
  );

  useEffect(() => {
    getDataCompany();
    getDataArchitect();
  }, []);

  const getDataCompany = () => {
    getData("/api/company")
      .then((resp) => {
        if (resp) {
          setDataCompany(resp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataArchitect = () => {
    getData("/api/architect")
      .then((resp) => {
        if (resp) {
          setDataArchitect(resp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCompanySearch = (searchInput) => {
    setCompanySearchText(searchInput);
  };

  const handleArchitectSearch = (searchInput) => {
    setArchitectSearchText(searchInput);
  };

  let companyFiltered = dataCompany.filter((item) => {
    return item?.name
      .toLocaleLowerCase()
      .includes(companySearchText.toLocaleLowerCase());
  });

  let architectWithKey = dataArchitect.map((item) => ({
    ...item,
    key: item.id,
  }));

  let architectFiltered = architectWithKey.filter((item) => {
    if (architectSearchText) {
      return (
        item?.company_id === selectedCompany?.id &&
        item?.name
          .toLocaleLowerCase()
          .includes(architectSearchText.toLocaleLowerCase())
      );
    }
    return item?.company_id === selectedCompany?.id;
  });

  return (
    <Layout className="h-full flex-row">
      {/* Company */}
      <div
        className="h-full flex flex-col text-color-alternative-black"
        style={{ width: "400px" }}
      >
        <div className="flex-none pl-4 pb-4 pr-8 bg-white">
          <h1 className="text-2xl font-bold mb-3">Company</h1>
          <hr className="mb-3" />
          <Input
            placeholder="Search here .... "
            prefix={<SearchOutlined />}
            allowClear
            size="large"
            onChange={(e) => handleCompanySearch(e.target.value)}
          />
        </div>
        <div className="flex-1 bg-white min-h-0">
          <ScrollArea className="h-full w-full rounded-md pl-2 pr-6">
            <List
              split={false}
              className="overflow-x-auto"
              itemLayout="horizontal"
              dataSource={companyFiltered}
              renderItem={(company) => (
                <CompanyListItem
                  companyData={company}
                  selectedCompany={selectedCompany}
                  onClick={() => setSelectedCompany(company)}
                />
              )}
            />
          </ScrollArea>
        </div>
      </div>

      {/* Architect */}
      <div className="flex-1 h-full flex flex-col text-color-alternative-black">
        <div className="flex-none pb-4 px-4 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-3">
              {selectedCompany ? selectedCompany.name : "No Company Selected"}
            </h1>
            {selectedCompany ? (
              <Button asChild>
                <NavLink to={`${encodeURIComponent(selectedCompany.name)}`}>
                  <SolutionOutlined />
                  Company Details
                </NavLink>
              </Button>
            ) : null}
          </div>
          <hr className="mb-3" />
          <Input
            placeholder="Search here .... "
            prefix={<SearchOutlined />}
            allowClear
            size="large"
            onChange={(e) => handleArchitectSearch(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-auto bg-white p-4 pt-2 min-h-0">
          <Table
            dataSource={architectFiltered}
            columns={columns}
            pagination={false}
            scroll={{ x: true }}
            tableLayout="fixed"
            style={{ width: "100%" }}
            components={{
              header: {
                cell: CustomHeaderCell,
              },
              body: {
                cell: CustomCell,
              },
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ListCompany;
