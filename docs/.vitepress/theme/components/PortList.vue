<script setup>
    import { ref, onMounted } from "vue";
    import YAML from "yaml";

    const props = defineProps({
        file: { type: String, required: true },
    });

    const data = ref({ category: "", intro: "", ports: [] });

    const yamlFiles = import.meta.glob("../data/ports/*.yaml", {
        query: "?raw",
        import: "default",
    });

    onMounted(async () => {
        try {
            const res = await fetch(`/data/ports/${props.file}`);
            const raw = await res.text();
            data.value = YAML.parse(raw);
        } catch (e) {
            console.error(`Port file not found: ${props.file}`, e);
        };
    });
</script>

<template>
	<section v-if="data.ports.length" class="my-8">
		<h3>{{ data.category }}</h3>
		<div v-html="data.intro" class="prose mb-4"></div>

		<div class="grid gap-4">
            <details v-for="port in data.ports" :key="port.name" class="border rounded shadow p-2">
                <summary class="font-semibold cursor-pointer">{{ port.emoji }} {{ port.name }}</summary>
                <div class="mt-2 ml-4 prose">
                    <p><strong>Made By:</strong> {{ port.madeBy }}</p>
                    <p><strong>Status:</strong> {{ port.status }}</p>
                    <p><strong>Location:</strong> {{ port.location }}</p>
                    <p>{{ port.description }}</p>
                </div>
            </details>
        </div>
	</section>

	<p v-else>Loading ports...</p>
</template>
