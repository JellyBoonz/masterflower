using System.Globalization;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;
using CSharpIntegration.Models;

namespace CSharpIntegration.Services;

/// <summary>
/// Service for exporting data to CSV format.
/// Handles CSV file generation for accounting/payroll integration.
/// </summary>
public class CsvExportService
{
    /// <summary>
    /// Exports a list of objects to a CSV file.
    /// Generic method that can export any type of data.
    /// </summary>
    /// <typeparam name="T">Type of objects to export</typeparam>
    /// <param name="data">List of objects to export</param>
    /// <param name="filePath">Full path where CSV file should be saved</param>
    public void ExportToCsv<T>(List<T> data, string filePath)
    {
        if (data == null || data.Count == 0)
        {
            Console.WriteLine($"Warning: No data to export to {filePath}");
            return;
        }

        using var writer = new StreamWriter(filePath);
        using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
        csv.WriteRecords(data);
        writer.Flush();
    }

    /// <summary>
    /// Exports store sales summaries to a CSV file.
    /// This is a specialized method for the accounting/payroll export format.
    /// Suggested CSV format:
    /// Store Number, Store Name, Address, Total Audits, Total Orders, Total Quantity, Date From, Date To, Pending Orders, Fulfilled Orders
    /// </summary>
    /// <param name="summaries">List of store sales summaries to export</param>
    /// <param name="filePath">Full path where CSV file should be saved</param>
    public void ExportStoreSummary(List<StoreSalesSummary> summaries, string filePath)
    {
        if (summaries == null || summaries.Count == 0)
        {
            Console.WriteLine($"Warning: No summaries to export to {filePath}");
            return;
        }

        var data = summaries.Select(s => new
        {
            s.StoreNumber,
            s.StoreName,
            s.Address,
            s.TotalAudits,
            s.TotalOrders,
            s.TotalQuantity,
            s.DateFrom,
            s.DateTo,
            s.PendingOrders,
            s.FulfilledOrders
        }).ToList();

        ExportToCsv(data, filePath);
    }

    /// <summary>
    /// Generates a file path with timestamp for exports.
    /// Example: "exports/audits_20241104_143022.csv"
    /// </summary>
    /// <param name="baseName">Base name for the file (e.g., "audits", "orders")</param>
    /// <param name="directory">Directory where file should be saved</param>
    /// <returns>Full file path with timestamp</returns>
    public string GenerateFilePath(string baseName, string directory)
    {
        var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
        var fileName = $"{baseName}_{timestamp}.csv";

        // Ensure directory exists
        if (!Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        return Path.Combine(directory, fileName);
    }
}

