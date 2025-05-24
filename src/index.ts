import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'open-coffee-shops-mcp',
  version: '1.0.0',
});

type Place = {
  type: 'node';
  id: number;
  tags: {
    [key: string]: string;
  };
};

const FRANCHISE_BRANDS = [
  'Starbucks',
  'Costa',
  'Insomnia',
  'Tim Hortons',
  "Dunkin'",
  'McCafé',
  'Pret A Manger',
  'Caffè Nero',
  'Coffee Bean & Tea Leaf',
  "Peet's Coffee",
  'Caribou Coffee',
  "Gloria Jean's Coffees",
  "Tully's Coffee",
  'Second Cup',
  'Lavazza',
  'Illy Caffè',
  'Segafredo Zanetti',
  'Au Bon Pain',
  'Panera Bread',
  'Tim Hortons',
  'Blue Bottle Coffee',
  'Philz Coffee',
  'Dutch Bros. Coffee',
];

server.tool(
  'get_open_coffee_shops_of_the_city',
  {
    city: z
      .string()
      .describe('The name of the city to search for coffee shops in'),
  },
  async ({ city }) => {
    try {
      console.log(`Searching for coffee shops in: ${city}`);

      const cityCoffeeShops = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];area[%22name%22=%22${encodeURIComponent(
          city
        )}%22]-%3E.a;(node[%22cuisine%22=%22coffee_shop%22](area.a););out;`
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      });

      if (
        !cityCoffeeShops.elements ||
        !Array.isArray(cityCoffeeShops.elements)
      ) {
        throw new Error('Invalid response from Overpass API');
      }

      const cityCoffeeShopsWithOpeningHours = cityCoffeeShops.elements.filter(
        (element: Place) => {
          const hasRequiredInfo =
            element.tags?.opening_hours &&
            element.tags?.name &&
            element.tags?.['addr:street'];

          const brandName = element.tags?.brand?.toLowerCase() || '';
          const shopName = element.tags?.name?.toLowerCase() || '';

          const isFranchise = FRANCHISE_BRANDS.some((brand) => {
            const brandLower = brand.toLowerCase();
            return (
              brandName.includes(brandLower) || shopName.includes(brandLower)
            );
          });

          return hasRequiredInfo && !isFranchise;
        }
      );

      console.log(
        `Found ${cityCoffeeShopsWithOpeningHours.length} independent coffee shops in ${city}`
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(cityCoffeeShopsWithOpeningHours, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('Error fetching coffee shops:', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error fetching coffee shops for ${city}: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log('MCP Server running successfully');
  } catch (error) {
    console.error('Failed to start MCP Server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
