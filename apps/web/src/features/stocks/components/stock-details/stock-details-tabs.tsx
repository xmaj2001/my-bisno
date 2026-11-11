"use client";

import {
  BadgePercent,
  ChartColumnIncreasing,
  CircleDollarSign,
  Copy,
  ExternalLink,
  MessageCircle,
  MousePointerClick,
  Package,
  QrCode,
  ShoppingBag,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StockItemDetails } from "../../types";

type StockDetailsTranslations =
  typeof import("@/i18n/dictionaries/pt.json")["stockDetails"];

interface StockDetailsTabsProps {
  product: StockItemDetails;
  productUrl: string;
  whatsappLink: string;
  translations: StockDetailsTranslations;
}

const analytics = [
  { key: "clicks", value: "128", percent: 84, icon: MousePointerClick },
  { key: "conversations", value: "32", percent: 58, icon: MessageCircle },
  { key: "sales", value: "8", percent: 36, icon: ShoppingBag },
] as const;

export function StockDetailsTabs({
  product,
  productUrl,
  whatsappLink,
  translations,
}: StockDetailsTabsProps) {
  const [shareText, setShareText] = useState(
    translations.defaultShareText.replace("{product}", product.name),
  );
  const [qrOpen, setQrOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (qrOpen && !dialog.open) dialog.showModal();
    if (!qrOpen && dialog.open) dialog.close();
  }, [qrOpen]);

  const copyToClipboard = async (value: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(successMessage);
    } catch {
      toast.error(translations.copyError);
    }
  };

  const getAnalyticsLabel = (key: (typeof analytics)[number]["key"]) =>
    translations.analytics[key];

  return (
    <>
      <Tabs defaultValue="produto" className="flex flex-col">
        <div className="border-b">
          <TabsList
            variant="line"
            className="h-auto w-full gap-0 rounded-none bg-transparent p-0"
          >
            <TabsTrigger value="produto" className="rounded-none px-4 py-3">
              {translations.productTab}
            </TabsTrigger>
            <TabsTrigger value="partilha" className="rounded-none px-4 py-3">
              {translations.shareTab}
            </TabsTrigger>
            <TabsTrigger value="analise" className="rounded-none px-4 py-3">
              {translations.analyticsTab}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="produto" className="mt-0 space-y-6 p-5 md:p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {product.category}
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              {product.name}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DetailCard
              icon={Package}
              label={translations.price}
              value={product.price}
            />
            <DetailCard
              icon={BadgePercent}
              label={translations.commission}
              value={product.commission}
            />
            <DetailCard
              icon={CircleDollarSign}
              label={translations.earning}
              value={product.earning}
            />
            <DetailCard
              icon={Package}
              label={translations.stock}
              value={String(product.stock)}
            />
          </div>

          {product.specs.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">
                {translations.specifications}
              </h3>
              <dl className="divide-y rounded-lg border px-4">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-4 py-3 text-sm"
                  >
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="text-right font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </TabsContent>

        <TabsContent value="partilha" className="mt-0 space-y-5 p-5 md:p-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{translations.shareTitle}</h2>
            <p className="text-sm text-muted-foreground">
              {translations.shareDescription}
            </p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium">
              {translations.messageLabel}
            </span>
            <textarea
              value={shareText}
              onChange={(event) => setShareText(event.target.value)}
              rows={5}
              className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              {translations.productLinkLabel}
            </p>
            <p className="break-all text-xs">{productUrl}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              type="button"
              onClick={() =>
                copyToClipboard(
                  `${shareText.trim()}\n\n${whatsappLink}`,
                  translations.shareCopied,
                )
              }
              disabled={!shareText.trim()}
              className="w-full"
            >
              <Copy />
              {translations.copyMessage}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                copyToClipboard(whatsappLink, translations.linkCopied)
              }
              className="w-full"
            >
              <Copy />
              {translations.copyWhatsappLink}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setQrOpen(true)}
              className="w-full"
            >
              <QrCode />
              {translations.showQr}
            </Button>
            <Button type="button" variant="outline" className="w-full" asChild>
              <a
                href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                  translations.whatsappMessage
                    .replace("{product}", product.name)
                    .replace("{link}", productUrl),
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle />
                {translations.openWhatsapp}
                <ExternalLink />
              </a>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analise" className="mt-0 space-y-5 p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">
                {translations.analyticsTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {translations.analyticsDescription}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {translations.demoData}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {analytics.map(({ key, value, percent, icon: Icon }) => (
              <div key={key} className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-2 text-muted-foreground">
                  <span className="text-xs">{getAnalyticsLabel(key)}</span>
                  <Icon className="size-4" />
                </div>
                <p className="mt-3 text-2xl font-bold">{value}</p>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
                  role="presentation"
                >
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <span className="text-sm text-muted-foreground">
              {translations.estimatedEarnings}
            </span>
            <span className="text-lg font-bold">4 000 Kz</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ChartColumnIncreasing className="size-4" />
            {translations.analyticsNote}
          </div>
        </TabsContent>
      </Tabs>

      <dialog
        ref={dialogRef}
        onClose={() => setQrOpen(false)}
        aria-labelledby="stock-share-qr-title"
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border bg-background p-0 text-foreground shadow-xl backdrop:bg-black/50"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 id="stock-share-qr-title" className="font-semibold">
            {translations.qrTitle}
          </h2>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label={translations.close}
            onClick={() => setQrOpen(false)}
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <div className="rounded-lg bg-white p-3">
            <QRCodeSVG value={whatsappLink} size={220} level="M" />
          </div>
          <p className="text-sm text-muted-foreground">
            {translations.qrDescription}
          </p>
          <Button type="button" variant="outline" className="w-full" asChild>
            <a
              href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                translations.whatsappMessage
                  .replace("{product}", product.name)
                  .replace("{link}", productUrl),
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle />
              {translations.openWhatsapp}
              <ExternalLink />
            </a>
          </Button>
        </div>
      </dialog>
    </>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </div>
      <p className="mt-2 text-sm font-semibold">{value}</p>
    </div>
  );
}
