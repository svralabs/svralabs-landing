<script lang="ts">
	import '../app.css';
	import { pageTransition } from '$lib/actions/motion';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/logowotext.png" />
	<link rel="apple-touch-icon" href="/logowotext.png" />
</svelte:head>

<div use:pageTransition class="w-full min-h-screen">
	{@render children()}
</div>
