<script setup>
    import YAML from 'yaml';

    const props = defineProps({
        file: { type: String, required: true }
    });

    const yamlFiles = import.meta.globEager('../data/ports/*.yaml', { query: '?raw', import: 'default' });

    const path = `../data/ports/${props.file}`;
    let raw = '';
    if (yamlFiles[path]) {
        raw = yamlFiles[path];
    } else {
        console.error(`Port file not found: ${path}`);
    };

    const data = raw ? YAML.parse(raw) : { category: '', intro: '', ports: [] };
</script>

<template>
    <section v-if="data.ports.length" class="my-8">
        <h3>{{ data.category }}</h3>
        <div v-html="data.intro" class="prose mb-4"></div>

        <div class="grid gap-4">
            <div v-for="port in data.ports" :key="port.name" class="p-4 border rounded shadow">
                <h4>{{ port.emoji }} {{ port.name }}</h4>
                <p><strong>Made By:</strong> {{ port.madeBy }}</p>
                <p><strong>Status:</strong> {{ port.status }}</p>
                <p><strong>Location:</strong> {{ port.location }}</p>
                <p>{{ port.description }}</p>
            </div>
        </div>
    </section>

    <p v-else>No ports found for file: {{ props.file }}</p>
</template>