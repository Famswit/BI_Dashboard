"use client";

import { CategoryDistributionChart } from "@/components/CategoryDistribution-charts";

import { MetricsCards } from "@/components/MetricsDataCard";
import { DataTable } from "@/components/OrderTable";
import { SalesChart } from "@/components/Sales-charts";
import { UserGrowthChart } from "@/components/UserGrowth-charts";
import React from "react";

const DashboardPage = () => {
  
  return (
          <div >
            {/** Metrics cards */}
            <MetricsCards />

            {/** sales and growthChart */}
            <div className="flex gap-5 mt-5 p-5">
              <div className="w-[60%]">
                <SalesChart />
              </div>
              <div className="w-[40%]">
                <UserGrowthChart />
              </div>
            </div>
            {/** CategoryDistributionChart and data table */}
            <div className="flex gap-5">
              <div className="w-[40%]">
                <CategoryDistributionChart />
              </div>
              <div>
                <DataTable />
              </div>
            </div>
          </div>
       
  );
};

export default DashboardPage;
