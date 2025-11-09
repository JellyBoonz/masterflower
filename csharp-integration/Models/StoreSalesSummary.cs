namespace CSharpIntegration.Models;

/// <summary>
/// Represents aggregated data for a store, suitable for accounting/payroll export.
/// This is a transformation class - you'll populate this by aggregating data from audits and orders.
/// </summary>
public class StoreSalesSummary
{
    /// <summary>
    /// Store number (e.g., "001", "002") - from stores.store_number
    /// </summary>
    public string StoreNumber { get; set; } = string.Empty;

    /// <summary>
    /// Store name (e.g., "Home Depot 123") - from stores.store_name
    /// </summary>
    public string StoreName { get; set; } = string.Empty;

    /// <summary>
    /// Store address - from stores.address
    /// </summary>
    public string? Address { get; set; }

    /// <summary>
    /// Total number of audits performed at this store.
    /// TODO: Calculate this by counting audits where Location == StoreNumber
    /// </summary>
    public int TotalAudits { get; set; }

    /// <summary>
    /// Total number of orders placed for this store.
    /// TODO: Calculate this by counting orders where Location == StoreNumber
    /// </summary>
    public int TotalOrders { get; set; }

    /// <summary>
    /// Total quantity across all audits for this store.
    /// TODO: Sum all Quantity values from audits where Location == StoreNumber
    /// </summary>
    public int TotalQuantity { get; set; }

    /// <summary>
    /// Earliest audit date for this store.
    /// TODO: Find the minimum CreatedAt from audits where Location == StoreNumber
    /// </summary>
    public DateTime? DateFrom { get; set; }

    /// <summary>
    /// Latest audit date for this store.
    /// TODO: Find the maximum CreatedAt from audits where Location == StoreNumber
    /// </summary>
    public DateTime? DateTo { get; set; }

    /// <summary>
    /// Total pending orders for this store.
    /// TODO: Count orders where Location == StoreNumber AND OrderStatus == "pending"
    /// </summary>
    public int PendingOrders { get; set; }

    /// <summary>
    /// Total fulfilled orders for this store.
    /// TODO: Count orders where Location == StoreNumber AND OrderStatus == "fulfilled"
    /// </summary>
    public int FulfilledOrders { get; set; }
}

