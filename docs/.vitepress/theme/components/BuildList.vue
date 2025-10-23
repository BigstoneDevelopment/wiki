<script setup>
    import { ref, onMounted } from "vue";
    import MarkdownIt from 'markdown-it'
    import YAML from "yaml";

    const md = new MarkdownIt()

    const props = defineProps({
        file: { type: String, required: true },
    });

    const data = ref({ category: "", intro: "", builds: [] });

    const yamlFiles = import.meta.glob("../data/builds/*/*.yaml", {
        query: "?raw",
        import: "default",
    });

    onMounted(async () => {
        try {
            const res = await fetch(`/data/builds/${props.file}`);
            const raw = await res.text();
            data.value = YAML.parse(raw);
            data.value.intro = md.render(data.value.intro);
            for (const build of data.value.builds) {
                build.description = md.render(build.description);
            };
        } catch (e) {
            console.error(`Build file not found: ${props.file}`, e);
        };
    });
</script>

<template>
    <section v-if="data.builds.length" class="my-8">
        <h3>{{ data.category }}</h3>
        <div v-html="data.intro" class="prose mb-4"></div>

        <div class="grid gap-4">
            <details
                v-for="build in data.builds"
                :key="build.name"
                :class="'details custom-block'"
            >
                <summary>{{ build.name }}</summary>
                <div class="vp-container-content">
                    <img :src="build.thumbnail" alt="" class="w-full h-auto rounded-2xl" />
                    <p><strong>Made By:</strong> {{ build.madeBy }}</p>
                    <p><strong>Status:</strong> {{ build.status }}</p>
                    <p><strong>Location:</strong> {{ build.location }}</p>
                    <p v-html="build.description"></p>
                </div>
            </details>
        </div>
    </section>

    <p v-else>No builds found for file: {{ props.file }}</p>
</template>
