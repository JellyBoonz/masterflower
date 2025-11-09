using Microsoft.Extensions.Configuration;
using CSharpIntegration.Services;
using CSharpIntegration.Models;

// Load configuration from appsettings.json
var builder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

var configuration = builder.Build();

// Transform data method - creates StoreSalesSummary objects
static List<StoreSalesSummary> TransformData(List<AuditRecord> audits, List<OrderRecord> orders, List<StoreRecord> stores)
{
    var summaries = new List<StoreSalesSummary>();

    foreach (var store in stores)
    {
        var storeAudits = audits.Where(a => a.Location == store.StoreNumber).ToList();
        var storeOrders = orders.Where(o => o.Location == store.StoreNumber).ToList();

        var summary = new StoreSalesSummary
        {
            StoreNumber = store.StoreNumber,
            StoreName = store.StoreName,
            Address = store.Address,
            TotalAudits = storeAudits.Count,
            TotalOrders = storeOrders.Count,
            TotalQuantity = storeAudits.Sum(a => a.Quantity),
            DateFrom = storeAudits.Any() ? storeAudits.Min(a => a.CreatedAt) : null,
            DateTo = storeAudits.Any() ? storeAudits.Max(a => a.CreatedAt) : null,
            PendingOrders = storeOrders.Count(o => o.OrderStatus == "pending"),
            FulfilledOrders = storeOrders.Count(o => o.OrderStatus == "fulfilled")
        };

        summaries.Add(summary);
    }

    return summaries;
}

try
{
    var apiBaseUrl = configuration["ConnectionStrings:BaseUrl"]
        ?? throw new InvalidOperationException("BaseUrl not found in appsettings.json");

    var exportDirectory = configuration["ExportSettings:ExportDirectory"] ?? "exports";

    if (!Directory.Exists(exportDirectory))
    {
        Directory.CreateDirectory(exportDirectory);
    }

    // Initialize services
    var apiService = new ApiService(apiBaseUrl);
    var csvExportService = new CsvExportService();

    Console.WriteLine("=== Masterflower Data Export Tool ===\n");

    var audits = await apiService.GetAllAuditsAsync();
    var orders = await apiService.GetAllOrdersAsync();
    var stores = await apiService.GetAllStoresAsync();

    // TODO: Step 2 - Transform data
    // Join audits with stores to get store names
    // Aggregate data by store (e.g., total quantity per store, total orders per store)
    // Create StoreSalesSummary objects for each store
    // Example:
    var summaries = TransformData(audits, orders, stores);

    csvExportService.ExportToCsv(audits, Path.Combine(exportDirectory, "audits_export.csv"));
    csvExportService.ExportToCsv(orders, Path.Combine(exportDirectory, "orders_export.csv"));
    csvExportService.ExportStoreSummary(summaries, Path.Combine(exportDirectory, "store_summary.csv"));

    Console.WriteLine("Data export completed successfully!");
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    Console.WriteLine($"Stack trace: {ex.StackTrace}");
    Environment.Exit(1);
}

