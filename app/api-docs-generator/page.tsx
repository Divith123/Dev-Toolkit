"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Download, FileText } from "lucide-react"

export default function ApiDocsGenerator() {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [format, setFormat] = useState<string>("markdown");
  const [generatedDocs, setGeneratedDocs] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Example function to generate API docs using existing Node.js modules
  const generateDocs = async () => {
    setIsGenerating(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This would use modules like jsdoc/typedoc for parsing in a real implementation
    const docs = generateSampleDocs(code, language, format);
    setGeneratedDocs(docs);
    setIsGenerating(false);
  };

  const generateSampleDocs = (code: string, language: string, format: string) => {
    // This is a simplified example - in a real app, you'd use actual parsing
    if (!code.trim()) return "";
    
    let docs = "";
    
    if (language === "javascript") {
      // Extract function names and parameters
      const functionMatches = code.match(/(?:async\s+)?function\s+(\w+)\s*$$([^)]*)$$/g) || [];
      const arrowFunctionMatches = code.match(/const\s+(\w+)\s*=\s*(?:async\s*)?$$([^)]*)$$\s*=>/g) || [];
      
      // Extract route handlers (Express.js style)
      const routeMatches = code.match(/(?:app|router)\.(?:get|post|put|delete|patch)\s*\(\s*['"]([^'"]+)['"]/g) || [];
      
      if (format === "markdown") {
        docs = "# API Documentation\n\n";
        
        if (routeMatches.length > 0) {
          docs += "## Endpoints\n\n";
          
          for (const route of routeMatches) {
            const method = route.match(/\.(get|post|put|delete|patch)/)?.[1].toUpperCase() || "GET";
            const path = route.match(/['"]([^'"]+)['"]/)?.[1] || "/";
            
            docs += `### ${method} \`${path}\`\n\n`;
            docs += "#### Description\n\n";
            docs += "Handles the " + method + " request for " + path + "\n\n";
            docs += "#### Parameters\n\n";
            docs += "| Name | Type | Description |\n";
            docs += "|------|------|-------------|\n";
            
            if (path.includes(":")) {
              const params = path.match(/:[^/]+/g) || [];
              for (const param of params) {
                const paramName = param.substring(1);
                docs += `| ${paramName} | string | The ${paramName} parameter |\n`;
              }
            } else {
              docs += "| - | - | No parameters required |\n";
            }
            
            docs += "\n#### Response\n\n";
            docs += "```json\n{\n  \"status\": \"success\",\n  \"data\": {}\n}\n```\n\n";
          }
        }
        
        const functions = [...functionMatches, ...arrowFunctionMatches];
        
        if (functions.length > 0) {
          docs += "## Functions\n\n";
          
          for (const func of functions) {
            const name = func.match(/(?:function|const)\s+(\w+)/)?.[1] || "unnamed";
            const params = func.match(/$$([^)]*)$$/)?.[1] || "";
            const paramList = params.split(",").map(p => p.trim()).filter(p => p);
            
            docs += `### ${name}(${params})\n\n`;
            docs += "#### Parameters\n\n";
            
            if (paramList.length > 0) {
              docs += "| Name | Type | Description |\n";
              docs += "|------|------|-------------|\n";
              
              for (const param of paramList) {
                const paramName = param.split("=")[0].trim();
                docs += `| ${paramName} | any | The ${paramName} parameter |\n`;
              }
            } else {
              docs += "This function does not take any parameters.\n";
            }
            
            docs += "\n#### Returns\n\n";
            docs += "Returns a result based on the provided parameters.\n\n";
          }
        }
      } else if (format === "openapi") {
        // Generate OpenAPI JSON
        const paths: Record<string, any> = {};
        
        for (const route of routeMatches) {
          const method = route.match(/\.(get|post|put|delete|patch)/)?.[1].toLowerCase() || "get";
          const path = route.match(/['"]([^'"]+)['"]/)?.[1] || "/";
          
          // Convert Express path params (:id) to OpenAPI format ({id})
          const openApiPath = path.replace(/:([^/]+)/g, "{$1}");
          
          const parameters = [];
          if (path.includes(":")) {
            const params = path.match(/:[^/]+/g) || [];
            for (const param of params) {
              const paramName = param.substring(1);
              parameters.push({
                name: paramName,
                in: "path",
                required: true,
                schema: {
                  type: "string"
                }
              });
            }
          }
          
          if (!paths[openApiPath]) {
            paths[openApiPath] = {};
          }
          
          paths[openApiPath][method] = {
            summary: `${method.toUpperCase()} endpoint for ${openApiPath}`,
            parameters,
            responses: {
              "200": {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: {
                          type: "string",
                          example: "success"
                        },
                        data: {
                          type: "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }
        
        const openApiSpec = {
          openapi: "3.0.0",
          info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API documentation generated from code"
          },
          paths
        };
        
        docs = JSON.stringify(openApiSpec, null, 2);
      }
    } else if (language === "python") {
      // Extract function and class definitions
      const functionMatches = code.match(/def\s+(\w+)\s*$$([^)]*)$$:/g) || [];
      const classMatches = code.match(/class\s+(\w+)(?:$$([^)]*)$$)?:/g) || [];
      
      // Extract Flask/FastAPI route handlers
      const routeMatches = code.match(/@(?:app|router)\.(?:route|get|post|put|delete|patch)\s*\(\s*['"]([^'"]+)['"]/g) || [];
      
      if (format === "markdown") {
        docs = "# API Documentation\n\n";
        
        if (routeMatches.length > 0) {
          docs += "## Endpoints\n\n";
          
          for (const route of routeMatches) {
            const method = route.includes(".route") ? "GET" : route.match(/\.(get|post|put|delete|patch)/)?.[1].toUpperCase() || "GET";
            const path = route.match(/['"]([^'"]+)['"]/)?.[1] || "/";
            
            docs += `### ${method} \`${path}\`\n\n`;
            docs += "#### Description\n\n";
            docs += "Handles the " + method + " request for " + path + "\n\n";
            docs += "#### Parameters\n\n";
            docs += "| Name | Type | Description |\n";
            docs += "|------|------|-------------|\n";
            
            if (path.includes("<")) {
              const params = path.match(/<[^>]+>/g) || [];
              for (const param of params) {
                const paramName = param.replace(/<|>/g, "");
                docs += `| ${paramName} | string | The ${paramName} parameter |\n`;
              }
            } else {
              docs += "| - | - | No parameters required |\n";
            }
            
            docs += "\n#### Response\n\n";
            docs += "```json\n{\n  \"status\": \"success\",\n  \"data\": {}\n}\n```\n\n";
          }
        }
        
        if (functionMatches.length > 0) {
          docs += "## Functions\n\n";
          
          for (const func of functionMatches) {
            const name = func.match(/def\s+(\w+)/)?.[1] || "unnamed";
            const params = func.match(/$$([^)]*)$$/)?.[1] || "";
            const paramList = params.split(",").map(p => p.trim()).filter(p => p && p !== "self" && p !== "cls");
            
            docs += `### ${name}(${paramList.join(", ")})\n\n`;
            docs += "#### Parameters\n\n";
            
            if (paramList.length > 0) {
              docs += "| Name | Type | Description |\n";
              docs += "|------|------|-------------|\n";
              
              for (const param of paramList) {
                const paramName = param.split(":")[0].split("=")[0].trim();
                const paramType = param.includes(":") ? param.split(":")[1].split("=")[0].trim() : "any";
                docs += `| ${paramName} | ${  ? param.split(":")[1].split("=")[0].trim() : "any";
                docs += `| $paramName| $paramType| The $paramNameparameter |\n`;
              }
            } else {
              docs += "This function does not take any parameters.\n";
            }
            
            docs += "\n#### Returns\n\n";
            docs += "Returns a result based on the provided parameters.\n\n";
          }
        }
        
        if (classMatches.length > 0) {
          docs += "## Classes\n\n";
          
          for (const cls of classMatches) {
            const name = cls.match(/class\s+(\w+)/)?.[1] || "unnamed";
            const inheritance = cls.match(/$$([^)]*)$$/)?.[1] || "";
            
            docs += `### $name\n\n`;
            
            if (inheritance) {
              docs += `Inherits from: ${inheritance}\n\n`;
            }
            
            docs += "#### Methods\n\n";
            docs += "This class contains various methods. Please refer to the source code for details.\n\n";
          }
        }
      } else if (format === "openapi") {
        // Generate OpenAPI JSON
        const paths: Record<string, any> = {};
        
        for (const route of routeMatches) {
          const method = route.includes(".route") ? "get" : route.match(/\.(get|post|put|delete|patch)/)?.[1].toLowerCase() || "get";
          const path = route.match(/['"]([^'"]+)['"]/)?.[1] || "/";
          
          // Convert Flask/FastAPI path params (<id>) to OpenAPI format ({id})
          const openApiPath = path.replace(/<([^>]+)>/g, "{$1}");
          
          const parameters = [];
          if (path.includes("<")) {
            const params = path.match(/<[^>]+>/g) || [];
            for (const param of params) {
              const paramName = param.replace(/<|>/g, "");
              parameters.push({
                name: paramName,
                in: "path",
                required: true,
                schema: {
                  type: "string"
                }
              });
            }
          }
          
          if (!paths[openApiPath]) {
            paths[openApiPath] = {};
          }
          
          paths[openApiPath][method] = {
            summary: `${method.toUpperCase()} endpoint for ${openApiPath}`,
            parameters,
            responses: {
              "200": {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: {
                          type: "string",
                          example: "success"
                        },
                        data: {
                          type: "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }
        
        const openApiSpec = {
          openapi: "3.0.0",
          info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API documentation generated from code"
          },
          paths
        };
        
        docs = JSON.stringify(openApiSpec, null, 2);
      }
    }
    
    return docs;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDocs);
  };

  const downloadDocs = () => {
    const element = document.createElement("a");
    const fileExtension = format === "markdown" ? "md" : "json";
    const file = new Blob([generatedDocs], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `api-docs.${fileExtension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Docs Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate API documentation from backend code automatically
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Source Code</CardTitle>
              <CardDescription>
                Paste your API code and select the language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="openapi">OpenAPI JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder={language === "javascript" ? 
                    "// Express.js API example\nconst express = require('express');\nconst app = express();\n\napp.get('/users', function getUsers(req, res) {\n  // Get all users\n  res.json({ users: [] });\n});\n\napp.get('/users/:id', function getUserById(req, res) {\n  // Get user by ID\n  const id = req.params.id;\n  res.json({ user: { id } });\n});" : 
                    "# Flask API example\nfrom flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route('/users')\ndef get_users():\n    # Get all users\n    return jsonify(users=[])\n\n@app.route('/users/<id>')\ndef get_user_by_id(id):\n    # Get user by ID\n    return jsonify(user={'id': id})"}
                  className="font-mono h-64"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <Button 
                  onClick={generateDocs} 
                  disabled={!code.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? "Generating..." : "Generate Documentation"}
                  {!isGenerating && <FileText className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Documentation</CardTitle>
              <CardDescription>
                API documentation in {format === "markdown" ? "Markdown" : "OpenAPI JSON"} format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="raw">Raw</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="space-y-4">
                  <div className="relative">
                    <pre className="font-mono text-sm p-4 rounded-md bg-muted overflow-auto max-h-[500px]">
                      {generatedDocs || "Generated documentation will appear here..."}
                    </pre>
                    {generatedDocs && (
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <Button size="icon" variant="outline" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy to clipboard</span>
                        </Button>
                        <Button size="icon" variant="outline" onClick={downloadDocs}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download documentation</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="raw">
                  <Textarea
                    readOnly
                    className="font-mono h-[500px]"
                    value={generatedDocs}
                    placeholder="Generated documentation will appear here..."
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

