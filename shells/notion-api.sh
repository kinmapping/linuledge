#!/bin/bash

curl -X POST "https://api.notion.com/v1/databases/${DATA_BASE_ID}/query" \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H 'Notion-Version: 2022-06-28' \
    -H "Content-Type: application/json" \
    --data '{
        "filter": {
            "property": "名前",
            "title": {
                "equals": "Notion API の導入"
            }
        }
    }'

curl -X POST 'https://api.notion.com/v1/pages' \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H 'Content-Type: application/json' \
    -H 'Notion-Version: 2022-06-28' \
    --data '{
        "parent": { "database_id": "'"$DATA_BASE_ID"'" },
        "properties": {
            "名前": {
                "title": [
                    {
                        "text": {
                            "content": "検証用のタイトル"
                        }
                    }
                ]
            }
        }
    }'

PAGE_ID=$(curl -X POST "https://api.notion.com/v1/databases/${DATA_BASE_ID}/query" \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H 'Notion-Version: 2022-06-28' \
    -H "Content-Type: application/json" \
    --data '{
        "filter": {
            "property": "名前",
            "title": {
                "equals": "検証用のタイトル"
            }
        }
    }' | jq -r '.results[].url' | sed -E 's|.*/([0-9a-f]{32})$|\1|') && echo $PAGE_ID

curl --location --request PATCH "https://api.notion.com/v1/pages/${PAGE_ID}" \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H 'Notion-Version: 2022-06-28' \
    -H "Content-Type: application/json" \
    --data '{
        "properties": {
            "チェックボックス": {
                "checkbox": true
            }
        }
    }'
