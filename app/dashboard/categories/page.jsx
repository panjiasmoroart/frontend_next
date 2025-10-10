"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { DataTable } from "./features/data-table";
import { columns } from "./features/columns";
import axiosInstance from "@/lib/axios";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .get(`/api/categories`)
      .then((response) => {
        const apiData = response.data.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          documentId: item.documentId,
        }));
        setCategories(apiData);
        setMeta(response.data.meta.pagination);
      })
      .catch((error) => {
        console.log("Failed to fetch categories:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-4 md:py-6 px-4 lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            <span>List of categories</span>
          </CardDescription>

          <CardAction>
            <Button
              onClick={() => {
                setSelectedItem(null);
                setSheetOpen(true);
              }}
            >
              Add a new record
            </Button>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              New
              {/* <New
                item={selectedItem}
                isOpen={sheetOpen}
                onSuccess={() => {
                  setSheetOpen(false);
                  fetchData();
                }}
              /> */}
            </Sheet>
          </CardAction>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <DataTable columns={columns} data={categories} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
