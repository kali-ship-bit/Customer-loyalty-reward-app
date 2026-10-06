import { Icon } from "@iconify/react";
import { useState } from "react";
import { MobileNav } from "./Sidebar";
import { useAppData } from "../context/AppDataContext";
import apiClient from "../lib/apiClient";

function formatDate(dateString) {
    if (!dateString) return "—";

    return new Date(dateString).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatDateTime(dateString) {
    if (!dateString) return "—";

    return new Date(dateString).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

export function PurchaseHistory() {
    const { purchases, loading } = useAppData();

    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState("");

    const handleViewDetails = async (purchaseId) => {
        setDetailsLoading(true);
        setDetailsError("");
        setSelectedPurchase(null);

        try {
            const result = await apiClient(
                `/purchases/getPurchaseById/${purchaseId}`
            );

            setSelectedPurchase(
                result.data?.purchase || result.data
            );
        } catch (error) {
            setDetailsError(
                error.message || "Unable to load purchase details."
            );
        } finally {
            setDetailsLoading(false);
        }
    };

    const closeDetails = () => {
        setSelectedPurchase(null);
        setDetailsError("");
    };

    return (
        <main className="w-full text-foreground pb-24 md:pb-8 min-h-screen">
            <header className="px-5 md:px-8 pt-6 pb-6 border-b border-border/40">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Purchase History
                </h1>

                <p className="text-muted-foreground mt-2">
                    View your previous purchases and points earned.
                </p>
            </header>

            <div className="px-5 md:px-8 py-8">
                <div className="card bg-card border border-border shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : purchases.length === 0 ? (
                        <div className="text-center py-16 px-6">
                            <Icon
                                icon="solar:bag-4-outline"
                                className="size-16 mx-auto text-muted-foreground mb-4"
                            />

                            <h2 className="text-xl font-semibold">
                                No purchases yet
                            </h2>

                            <p className="text-muted-foreground mt-2">
                                Your completed purchases will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {purchases.map((purchase) => (
                                <button
                                    key={purchase._id}
                                    type="button"
                                    onClick={() =>
                                        handleViewDetails(purchase._id)
                                    }
                                    className="w-full text-left p-5 hover:bg-muted/20 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-start gap-4 min-w-0">
                                            <div className="size-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <Icon
                                                    icon="solar:bag-4-outline"
                                                    className="size-5"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h2 className="font-semibold">
                                                    {purchase.productName}
                                                </h2>

                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Purchased on{" "}
                                                    {formatDate(
                                                        purchase.createdAt
                                                    )}
                                                </p>

                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Quantity:{" "}
                                                    {purchase.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="md:text-right">
                                            <p className="font-bold">
                                                ₦
                                                {Number(
                                                    purchase.totalPrice
                                                ).toLocaleString()}
                                            </p>

                                            <p className="text-sm text-green-600 font-medium mt-1">
                                                +{purchase.pointsEarned} pts
                                            </p>

                                            <p className="text-sm text-muted-foreground mt-1">
                                                {purchase.status}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Purchase Details */}
            {(selectedPurchase || detailsLoading || detailsError) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-xl">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Purchase Details
                                </h2>

                                <p className="text-sm text-muted-foreground mt-1">
                                    Transaction information
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeDetails}
                                className="btn btn-circle btn-dark text-white"
                                aria-label="Close purchase details"
                            >
                                <Icon
                                    icon="solar:close-circle-outline"
                                    className="size-6"
                                />
                            </button>
                        </div>

                        {detailsLoading ? (
                            <div className="flex justify-center py-12">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : detailsError ? (
                            <div className="p-6 text-center">
                                <Icon
                                    icon="solar:danger-circle-outline"
                                    className="size-12 mx-auto text-error mb-3"
                                />

                                <p className="font-medium">
                                    {detailsError}
                                </p>

                                <button
                                    type="button"
                                    onClick={closeDetails}
                                    className="btn btn-dark mt-5"
                                >
                                    Close
                                </button>
                            </div>
                        ) : selectedPurchase ? (
                            <div className="p-6 space-y-5">
                                <div className="rounded-2xl bg-muted/30 p-4">
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                                        Product
                                    </p>

                                    <p className="text-lg font-bold mt-1">
                                        {selectedPurchase.productName}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Quantity
                                        </p>
                                        <p className="font-semibold mt-1">
                                            {selectedPurchase.quantity}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Price
                                        </p>
                                        <p className="font-semibold mt-1">
                                            ₦
                                            {Number(
                                                selectedPurchase.totalPrice
                                            ).toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Points Earned
                                        </p>
                                        <p className="font-semibold text-green-600 mt-1">
                                            +
                                            {selectedPurchase.pointsEarned}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Status
                                        </p>
                                        <p className="font-semibold mt-1">
                                            {selectedPurchase.status}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Transaction ID
                                    </p>

                                    <p className="text-sm font-mono break-all mt-1">
                                        {selectedPurchase._id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Purchase Date
                                    </p>

                                    <p className="font-medium mt-1">
                                        {formatDateTime(
                                            selectedPurchase.createdAt
                                        )}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            <MobileNav />
        </main>
    );
}