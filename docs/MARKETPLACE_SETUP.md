# TitanForge Marketplace Integration Setup Guide

## Overview

This guide will help you connect your Amazon, eBay, and Etsy seller accounts to TitanForge for unified order management and automated production workflows.

## Required API Credentials

### 1. Amazon Seller Partner API (SP-API)

#### Prerequisites

- Amazon Seller Central account
- Professional selling plan
- Access to SP-API (requires approval)

#### Required Credentials

```bash
AMAZON_SELLER_ID=your_selling_partner_id
AMAZON_REFRESH_TOKEN=your_refresh_token
AMAZON_CLIENT_ID=your_lwa_client_id
AMAZON_CLIENT_SECRET=your_lwa_client_secret
AMAZON_REGION=NA  # NA, EU, or FE
```

#### Setup Steps

1. **Register as Developer**
   - Go to Amazon Seller Central → Apps & Services → Develop apps
   - Create a new app and get Client ID & Secret

2. **Get Authorization**
   - Implement OAuth flow to get refresh token
   - Requires customer consent flow
   - Store refresh token securely

3. **API Access**
   - Request access for required endpoints:
     - `getOrders` (Orders API)
     - `getOrderItems` (Orders API)
     - `listInventorySupply` (FBA Inventory API)

### 2. eBay Trading API

#### Prerequisites

- eBay seller account
- eBay Developer account
- Production keys (sandbox for testing)

#### Required Credentials

```bash
EBAY_APP_ID=your_app_id
EBAY_DEV_ID=your_developer_id
EBAY_CERT_ID=your_cert_id
EBAY_USER_TOKEN=your_user_token
EBAY_ENVIRONMENT=production  # or sandbox
```

#### Setup Steps

1. **Create eBay Developer Account**
   - Visit https://developer.ebay.com
   - Create application and get App ID, Dev ID, Cert ID

2. **Get User Token**
   - Use Auth & Auth flow or OAuth 2.0
   - Generate user token for your seller account
   - Token allows access to your selling data

3. **API Permissions**
   - Request access to:
     - Trading API (GetOrders, GetSellerList)
     - Inventory API (GetInventory)
     - Fulfillment API (order management)

### 3. Etsy API v3

#### Prerequisites

- Etsy seller account (shop)
- Etsy Developer account
- OAuth application

#### Required Credentials

```bash
ETSY_CLIENT_ID=your_client_id
ETSY_ACCESS_TOKEN=your_oauth_access_token
ETSY_SHOP_ID=your_shop_id
ETSY_REFRESH_TOKEN=your_refresh_token  # Optional for token refresh
```

#### Setup Steps

1. **Create Etsy App**
   - Visit https://www.etsy.com/developers
   - Create new application
   - Get Client ID and Client Secret

2. **OAuth Flow**
   - Implement OAuth 2.0 flow
   - Redirect user to authorize your app
   - Exchange code for access token

3. **Find Shop ID**
   - Use `/shops` endpoint to find your shop ID
   - Or extract from shop URL

## Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Amazon SP-API
AMAZON_SELLER_ID=
AMAZON_REFRESH_TOKEN=
AMAZON_CLIENT_ID=
AMAZON_CLIENT_SECRET=
AMAZON_REGION=NA

# eBay API
EBAY_APP_ID=
EBAY_DEV_ID=
EBAY_CERT_ID=
EBAY_USER_TOKEN=
EBAY_ENVIRONMENT=production

# Etsy API
ETSY_CLIENT_ID=
ETSY_ACCESS_TOKEN=
ETSY_SHOP_ID=
ETSY_REFRESH_TOKEN=

# Optional: API Rate Limiting
MARKETPLACE_API_RATE_LIMIT=100
MARKETPLACE_CACHE_TTL=300
```

## Testing Your Integration

### 1. Test Connections

```typescript
import { MarketplaceIntegrationService, createMarketplaceConfig } from '@/services/marketplaceAPI';

const config = createMarketplaceConfig();
const service = new MarketplaceIntegrationService(config);

// Test each platform
const orders = await service.getAllOrders(7); // Last 7 days
console.log(`Found ${orders.length} orders across all platforms`);
```

### 2. Production Checklist

- [ ] All API credentials configured
- [ ] Test orders retrieved successfully
- [ ] Production queue populates correctly
- [ ] Order status updates work
- [ ] Error handling tested
- [ ] Rate limiting respected

## API Rate Limits & Best Practices

### Amazon SP-API

- **Rate Limit**: Varies by endpoint (typically 0.0167 requests/second)
- **Burst**: Limited burst capacity
- **Best Practice**: Cache data, use webhooks when available

### eBay API

- **Rate Limit**: 5,000 API calls/day (Trading API)
- **Concurrent**: Up to 4 concurrent requests
- **Best Practice**: Batch requests, implement exponential backoff

### Etsy API

- **Rate Limit**: 10 requests/second per app
- **Daily**: 10,000 requests/day per app
- **Best Practice**: Use pagination efficiently, cache shop data

## Production Workflow Integration

### Order Processing Flow

1. **Order Detection**: APIs poll for new orders every 5 minutes
2. **Order Classification**: Identify 3D printing items vs regular products
3. **Production Queue**: Add 3D printing orders to production queue
4. **Status Updates**: Update marketplace when items ship
5. **Analytics**: Track performance across all platforms

### Automated Actions

- **Inventory Sync**: Update stock levels across platforms
- **Order Fulfillment**: Mark orders as shipped with tracking
- **Production Planning**: Estimate print times and schedule
- **Customer Communication**: Send production updates

## Troubleshooting

### Common Issues

1. **Token Expiration**: Implement refresh token logic
2. **Rate Limiting**: Add retry with exponential backoff
3. **Data Sync**: Handle API downtime gracefully
4. **Authentication**: Validate credentials regularly

### Error Monitoring

- Monitor API response codes
- Log failed requests for debugging
- Set up alerts for connection failures
- Track success rates per platform

## Security Considerations

### API Key Management

- Never commit credentials to version control
- Use environment variables only
- Rotate tokens regularly
- Monitor for unauthorized usage

### Data Protection

- Encrypt customer data at rest
- Use HTTPS for all API calls
- Implement proper access controls
- Follow GDPR/privacy regulations

## Support & Resources

### Documentation Links

- [Amazon SP-API Docs](https://developer-docs.amazon.com/sp-api/)
- [eBay API Documentation](https://developer.ebay.com/api-docs/static/overview.html)
- [Etsy API Documentation](https://developers.etsy.com/documentation)

### Development Tools

- **Postman Collections**: Available for all three APIs
- **API Explorers**: Test endpoints directly
- **SDK Libraries**: Official and community libraries available

---

**Need Help?** Contact TitanForge support for assistance with marketplace integration setup.
