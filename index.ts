#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { Command } from "commander";

const program = new Command();

program.name("kubeswitch").description("A simple CLI tool for kubernetes");

program
	.command("list")
	.description("List all kubernetes clusters")
	.action(() => {
		const kubeDir = path.join(homedir(), ".kube");
		const items = readdirSync(kubeDir);
		const validConfigs = items
			.filter((item) => item.endsWith("yaml") || item.endsWith("yml"))
			.map((item) => item.replace(".yaml", "").replace(".yml", ""));
		console.log("kubernetes clusters: ", validConfigs);
	});

program
	.command("use <cluster>")
	.description("Use a specific kubernetes cluster")
	.action((cluster: string) => {
		const kubeDir = path.join(homedir(), ".kube");
		const items = readdirSync(kubeDir);
		const validConfigs = items.filter(
			(item) => item.endsWith("yaml") || item.endsWith("yml"),
		);
		const clusterConfigPath = validConfigs.find((item) =>
			item.startsWith(cluster),
		);
		if (!clusterConfigPath) {
			console.log("cluster not found: ", cluster);
			return;
		}
		console.log("using cluster: ", clusterConfigPath);
		const clusterConfigContent = readFileSync(
			path.join(kubeDir, clusterConfigPath),
			"utf-8",
		);
		const configPath = path.join(kubeDir, "config");
		writeFileSync(configPath, clusterConfigContent);
	});

if (process.argv.length === 2) {
	program.help();
}

program.parse();
